import express from 'express';
import dotenv from 'dotenv';
import db from './config/connection.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
    try {
        await db();
        app.use(routes);
        app.listen(PORT, () => {
            console.log(` API server running on port ${PORT}!`);
        });
    } catch (error) {
        console.error(" Failed to connect to database:", error);
        process.exit(1);
    }
};

startServer();
