import express, { Request, Response } from "express";
import multer from "multer";
import {warmPrinterBed, warmPrinterHead, printStlFile} from './routes/octoPrintWrapper';

const router = express.Router();

// Middleware for file upload
const upload = multer({ dest: "uploads/" });

// 1. Warm printer head - receives temperature
router.post("/printer/head/warm", (req: Request, res: Response) => {
    // const { temperature } = req.body;

    // if (typeof temperature !== "number" || temperature <= 0) {
    //     return res.status(400).json({ error: "Invalid or missing temperature." });
    // }

    // // Logic to warm the printer head
    // console.log(`Warming printer head to ${temperature}°C`);

    // return res.status(200).json({ message: `Printer head warming to ${temperature}°C` });

});

// 2. Warm printer bed - receives temperature
router.post("/printer/bed/warm", (req: Request, res: Response) => {
    // const { temperature } = req.body;

    // if (typeof temperature !== "number" || temperature <= 0) {
    //     return res.status(400).json({ error: "Invalid or missing temperature." });
    // }

    // // Logic to warm the printer bed
    // console.log(`Warming printer bed to ${temperature}°C`);

    // return res.status(200).json({ message: `Printer bed warming to ${temperature}°C` });
});

// 3. Print STL file - receives an STL file and optional slicer settings
router.post("/printer/print", upload.single("stlFile"), (req: Request, res: Response) => {
    // const stlFile = req.file;
    // const slicerSettings = req.body.slicerSettings ? JSON.parse(req.body.slicerSettings) : {};

    // if (!stlFile) {
    //     return res.status(400).json({ error: "STL file is required." });
    // }

    // // Logic to handle STL file and slicer settings
    // console.log(`Received STL file: ${stlFile.originalname}`);
    // console.log("Slicer settings:", slicerSettings);

    // return res.status(200).json({
    //     message: "STL file received. Printing initiated.",
    //     file: stlFile.originalname,
    //     slicerSettings,
    // });
});

export default router;
