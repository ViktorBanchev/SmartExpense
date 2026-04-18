import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./routes";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { config } from "./config";

const app = express();

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(config.MONGO_URI, {
        dbName: 'expense-tracker'
    });
}

app.use(cors({
    origin: config.CLIENT_URI,
    credentials: true
}));
app.use(morgan('short'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);

app.listen(config.port, () => console.log(`Server working on port ${config.port}`))