import { Request, Response } from "express";
import {sendWarmUpHotendTempRequest, sendWarmUpBedTempRequest, sendOctoPrintSTLRequest } from "../service/octroPrintWrapper.service"


export const warmPrinterBed = async (req: Request, res: Response) => {
    const { temperature } = req.body;
    if (typeof temperature !== "number" || temperature < 0) {
        res.status(400).json({ error: "Invalid or missing temperature." });
    }

    // Logic to warm the printer bed
    const octoReponse = await sendWarmUpBedTempRequest(temperature)
    console.log(`Warming printer bed to ${temperature}°C`);

    //TODO:message details
    res.status(octoReponse.status).json({ message: `Printer bed warming operation returned status ${octoReponse.status}` });

}


export const warmPrinterHotend = async (req: Request, res: Response) =>{
    const { temperature } = req.body;

    if (typeof temperature !== "number" || temperature < 0) {
        res.status(400).json({ error: "Invalid or missing temperature." });
    }

    // Logic to warm the printer head
    const octoReponse = await sendWarmUpHotendTempRequest(temperature)
    console.log(`Warming printer head to ${temperature}°C`);

    //TODO:message details
    res.status(octoReponse.status).json({ message: `Printer head warming operation returned status ${octoReponse.status}` });
};




export const printStlFile = async (req: Request, res: Response) =>{
    const stlFile = req.file;
    if (!stlFile){
        res.status(400).json({ error: "STL file not found" });
        throw new Error("Failed to extract stl file from request body")
    }
    const slicerSettings = req.body.slicerSettings ? JSON.parse(req.body.slicerSettings) : {};
    

    // Logic to handle STL file and slicer settings
    console.log(`Received STL file: ${stlFile.originalname}`);
    console.log("Slicer settings:", slicerSettings);
    try{
        sendOctoPrintSTLRequest(stlFile, slicerSettings);
    }
    catch (error : any){
        console.error("Error processing print request:", error.message);
        res.status(500).json({
            error: "Failed to process print request. Please check the logs for more details.",
            details: error.message,
        })
    }

    res.status(200).json({
        message: "STL file received. Printing initiated.",
        file: stlFile.originalname,
        slicerSettings,
    });
}