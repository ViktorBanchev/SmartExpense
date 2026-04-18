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
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('short'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('working')
})

app.listen(config.port, () => console.log(`Server working on port ${config.port}`))