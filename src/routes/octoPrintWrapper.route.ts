import express, { Request, Response } from "express";
import multer from "multer";
import {warmPrinterHotend, warmPrinterBed, printStlFile} from "../controller/octoPrintWrapper.controller";

const router = express.Router();

// Middleware for file upload
const upload = multer({ dest: "uploads/" });

// 1. Warm printer head - receives temperature
router.post("/hotend/warm", warmPrinterHotend);

// 2. Warm printer bed - receives temperature
router.post("/bed/warm", warmPrinterBed);

// 3. Print STL file - receives an STL file and optional slicer settings
router.post("/print", upload.single("stlFile"), printStlFile);

export default router;
