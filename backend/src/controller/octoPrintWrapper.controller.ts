import { Request, Response } from "express";
import {sendWarmUpHotendTempRequest, sendWarmUpBedTempRequest, sendOctoPrintSTLRequest } from "../service/octroPrintWrapper.service"


export const warmPrinterBed = async (req: Request, res: Response) => {
    const { temperature } = req.body;
    if (typeof temperature !== "number" || temperature < 0) {
        res.status(400).json({ error: "Invalid or missing temperature." });
    }

    // Logic to warm the printer bed
    try {
        await sendWarmUpBedTempRequest(temperature)
        res.status(200).json({ message: `Printer bed temperature action set and started` });

    } catch (error) {
        res.status(409).json({ message: 'Conflict with Printer bed warmup action command '})
    }
}

export const warmPrinterHotend = async (req: Request, res: Response) =>{
    const { temperature } = req.body;

    if (typeof temperature !== "number" || temperature < 0) {
        res.status(400).json({ error: "Invalid or missing temperature." });
    }

    // Logic to warm the printer head
    try {
        await sendWarmUpHotendTempRequest(temperature);
        res.status(200).json({ message: `Printer head temperature action set and started` });
    } catch (error) {
        res.status(409).json({ message: 'Conflict with Printer head warmup action command '})
    }
};

export const printStlFile = async (req: Request, res: Response) =>{
    const stlFile = req.file;
    const slicerSettings = req.body.slicerSettings ? JSON.parse(req.body.slicerSettings) : {};

    // Logic to handle STL file and slicer settings
    try{
        await sendOctoPrintSTLRequest(stlFile, slicerSettings);
        res.status(200).json({
            message: "STL file received. Printing initiated.",
            file: stlFile?.originalname,
            slicerSettings,
        });
    }
    catch (error : any){
        res.status(500).json({
            error: "Failed to process print request. Please check the logs for more details.",
            details: error.message,
        })
    }
}