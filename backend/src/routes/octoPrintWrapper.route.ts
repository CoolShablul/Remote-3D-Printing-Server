import express, { Request, Response } from "express";
import multer from "multer";
import {warmPrinterHotend, warmPrinterBed, printStlFile} from "../controller/octoPrintWrapper.controller";
import path from "path";

const router = express.Router();

// Middleware for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})
const upload = multer({ storage: storage});

// 1. Warm printer head - receives temperature
router.post("/hotend/warm", warmPrinterHotend);

// 2. Warm printer bed - receives temperature
router.post("/bed/warm", warmPrinterBed);

// 3. Print STL file - receives an STL file and optional slicer settings
router.post("/print", upload.single("stlFile"), printStlFile);

export default router;
