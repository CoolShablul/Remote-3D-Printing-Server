import express, { Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app: Application = express();

// Middleware
app.use(express.json());

// Routes

app.listen(PORT,
    () => console.log(`Server is running on http://localhost:${PORT}`)
);
