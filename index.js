import express from "express";
//import { createConnection } from "./userDb";
import { MongoClient } from "mongodb";

// const dotenv = require("dotenv");
// const mongoose = require("mongoose");

import { getGenre } from "./amazon1.js";
import routes from "./router.js"
//import data from "./amazon1";



const app = express();


app.get("/", (req, res)=>{
    res.send("Hello working good")
})
app.use("/", routes)

app.listen(9001, ()=>console.log(`Server running in localhost:9001`))


  