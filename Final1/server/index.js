import express from "express";
import dotenv from "dotenv";
import Router from "./routes/route.js";
import cors from 'cors'; 
import Connection from "./database/db.js    ";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json({extended :true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',Router);
app.use(express.json({limit: '50mb'}));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});     

const DB_URL = process.env.DB_URL;
console.log(DB_URL);
Connection(DB_URL);