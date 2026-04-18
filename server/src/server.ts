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
    await mongoose.connect('mongodb://localhost:27017', {
        dbName: 'smart-expense'
    });
}

app.use(cors({
    origin: 'http://localhost:5173', // ВНИМАНИЕ: Смени това с порта, на който реално върви твоят React!
    credentials: true // Това е КРИТИЧНО, за да могат да минават бисквитките (cookies) за логин
}));
app.use(morgan('short'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('working')
})

app.listen(config.port, () => console.log(`Server working on port ${config.port}`))