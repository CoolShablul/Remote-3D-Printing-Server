import express, { Application } from 'express';
import dotenv from 'dotenv';
import router from "./routes";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app: Application = express();

// Middleware
app.use(express.json());

app.use('/api', router);

app.listen(PORT,
    () => console.log(`Server is running on http://localhost:${PORT}`)
);
