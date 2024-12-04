import { exec } from "child_process";
import axios from "axios";
import fs from "fs";
import path from "path";
import FormData from 'form-data';
import {sendOctoPrintPostRequest} from "../utils/octoPrint.utils";

export const sendWarmUpBedTempRequest = async (target : number) => {
    const options = {
        "command": "target",
        "target": target
    }
    return await sendOctoPrintPostRequest(`${process.env.OCTOPRINT_PATH_PREFIX}/api/printer/bed`, options);
}


export const sendWarmUpHotendTempRequest = async (target : number) => {
    const options = {
        command: "target",
        targets: {
            tool0: target
        }}
    return await sendOctoPrintPostRequest(`${process.env.OCTOPRINT_PATH_PREFIX}/printer/tool0`, options);
}


/**
 * Route to upload an STL file and slicer settings, slice it, and send a print command to OctoPrint
 */
export const sendOctoPrintSTLRequest = async (stlFile : Express.Multer.File, slicerSettings : any) => {
    console.log("service started!");
    // Ensure gcode output directory exists
    if (!fs.existsSync("sliced")) {
        fs.mkdirSync("sliced");
    }
    const gcodePath = path.join("sliced", `${path.basename(stlFile.originalname, ".stl")}.gcode`); // Path for the output G-code
    await sliceCommand(stlFile, slicerSettings, gcodePath);

    // Upload the G-code to OctoPrint
    const gcodeUploadResponse = await uploadGCodeToOctoPrint(gcodePath);        //TODO: returning data - later used for refferencing the gcode inside octoprint container
    console.log("G-code uploaded to OctoPrint container:", gcodeUploadResponse);

    // Issue the print command to OctoPrint
    const printResponse = await issuePrintCommand(gcodeUploadResponse.files.local.path);
    console.log("Print command issued successfully:", printResponse);
}

/**
 * Execute a shell command and return a promise.
 */
const sliceCommand = (stlFile: any, slicerSettings : any, gcodePath : string): Promise<void> => {

    // Convert JSON settings to Slicer CLI arguments
    const overrideSettings = Object.entries(slicerSettings)
        .map(([key, value]) => `--${key}=${value}`)
        .join(" ");

    console.log("slicer Settings:", slicerSettings)
    console.log("stlFile:", stlFile)

    // Construct the full Slic3r command
    const slicerCommand = `slic3r -s --load ./config.ini ${stlFile.path} --output ${gcodePath} ${overrideSettings}`;
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
    console.log("tometomer", gcodePath)
    const url = `${process.env.OCTOPRINT_PATH_PREFIX}/api/files/local`;

    const formData = new FormData();
    formData.append('file', fs.createReadStream(gcodePath));
    formData.append('filename', path.basename(gcodePath));

    const response = await axios.post(url, formData, {
        headers: {
            // "Content-Type": "multipart/form-data",
            // "Content-Length": "",
            ...formData.getHeaders(),
            "x-api-key": process.env.OCTOPRINT_API_KEY,
        },
    });
    return response.data;
};



/**
 * Issue a print command to OctoPrint for the uploaded G-code file.
 */
const issuePrintCommand = async (gcodeFilename: string) => {
    const url = `${process.env.OCTOPRINT_PATH_PREFIX}/api/files/local/${gcodeFilename}`;

    const payload = {
        command: "select",
        print: true,
    };

    const response = await axios.post(url, payload, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.OCTOPRINT_API_KEY,
        },
    });
    return response.data;
};