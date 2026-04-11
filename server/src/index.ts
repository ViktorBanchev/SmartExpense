import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./routes.js";

const app = express();

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017', {
        dbName: 'smart-expense'
    });
}

app.use(morgan('short'));
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('working')
})

app.listen(5050, () => console.log('Server working on http://localhost:5050'))