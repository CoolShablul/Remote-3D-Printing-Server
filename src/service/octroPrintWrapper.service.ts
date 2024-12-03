import { exec } from "child_process";
import axios from "axios";
import fs from "fs";
import path from "path";
import {sendOctoPrintPostRequest} from "../utils/octoPrint.utils";


export const sendWarmUpBedTempRequest = async (target : number) => {
    const options = {
        "command": "target",
        "target": target
    }
    return await sendOctoPrintPostRequest('http://localhost:5000/api/printer/bed', options);
}


export const sendWarmUpHotendTempRequest = async (target : number) => {
    const options = {
        command: "target",
        targets: {
            tool0: target
        }}
    return await sendOctoPrintPostRequest('http://localhost:5000/api/printer/tool0', options);
}


/**
 * Route to upload an STL file and slicer settings, slice it, and send a print command to OctoPrint
 */
export const sendOctoPrintSTLRequest = async (stlFile : any, slicerSettings : any) => {
    try {
        // Ensure gcode output directory exists
        if (!fs.existsSync("sliced")) {
            fs.mkdirSync("sliced");
        }
        const gcodePath = path.join("sliced", `${path.basename(stlFile.originalname, ".stl")}.gcode`); // Path for the output G-code
        await sliceCommand(stlFile, slicerSettings, gcodePath);

        // Upload the G-code to OctoPrint
        const gcodeUploadResponse = await uploadGCodeToOctoPrint(gcodePath);
        console.log("G-code uploaded to OctoPrint container:", gcodeUploadResponse);

        // Issue the print command to OctoPrint
        const printResponse = await issuePrintCommand(gcodeUploadResponse.name);
        console.log("Print command issued successfully:", printResponse);

        res.status(200).json({
            message: "STL sliced and print command issued successfully.",
            gcodeFile: gcodeUploadResponse.name,
        });
    } catch (error: any) {
        console.error("Error processing print request:", error.message);
        res.status(500).json({
            error: "Failed to process print request. Please check the logs for more details.",
            details: error.message,
        });
    } finally {
        // Cleanup uploaded files if needed
        fs.unlink(stlFile.path, () => {});
    }
};

/**
 * Execute a shell command and return a promise.
 */
const sliceCommand = (stlFile: any, slicerSettings : any, gcodePath : string): Promise<void> => {

    // const jsonSettings = JSON.parse(fs.readFileSync(slicerSettings, "utf-8"));

    // Convert JSON settings to Slic3r CLI arguments
    const overrideSettings = Object.entries(slicerSettings)
        .map(([key, value]) => `--${key}=${value}`)
        .join(" ");

    // Construct the full Slic3r command
    const slicerCommand = `slic3r -s --load ${slicerSettings} ${stlFile} --output ${gcodePath} ${overrideSettings}`;
    console.log("Running slicer command:", slicerCommand);
    return new Promise((resolve, reject) => {
        exec(slicerCommand, (error, stdout, stderr) => {
            if (error) {
                console.error("Slicer error:", stderr || stdout);
                reject(error);
            } else {
                console.log("Slicer output:", stdout);
                resolve();
            }
        });
    });
};

/**
 * Upload G-code to OctoPrint.
 */
const uploadGCodeToOctoPrint = async (gcodePath: string) => {
    const url = `${process.env.OCTOPRINT_PATH_PREFIX}/api/files/local`;
    const fileStream = fs.createReadStream(gcodePath);

    const response = await axios.post(url, fileStream, {
        headers: {
            "Content-Type": "application/octet-stream",
            "x-api-key": process.env.OCTOPRINT_API_KEY,
        },
        params: {
            filename: path.basename(gcodePath),
        },
    });
    return response.data;
};

/**
 * Issue a print command to OctoPrint for the uploaded G-code file.
 */
const issuePrintCommand = async (gcodeFilename: string) => {
    const url = `${process.env.OCTOPRINT_PATH_PREFIX}/api/job`;

    const payload = {
        command: "select",
        print: true,
        file: `local/${gcodeFilename}`, // Path to the uploaded file in OctoPrint
    };

    const response = await axios.post(url, payload, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.OCTOPRINT_API_KEY,
        },
    });

    return response.data;
};