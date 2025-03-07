const express =  require("express");
const app = express();
const port = 7000;
const mongoose = require("mongoose");
const {mongoUrl} = require("./keys");
const cors = require("cors");
app.use(cors());

require("./models/model");
//midle ware to conevrt to jason the data from header
//and its place in code is critical it should be before importing auth.js 
app.use(express.json());
app.use(require("./routes/auth"));//midleware functions

mongoose.connect(mongoUrl);

mongoose.connection.on("connected",()=>{
    console.log("connected SuCcEsYfULYL");
})
mongoose.connection.on("error",()=>{
    console.log("NOT connected");
})

app.listen(port,()=>{
    console.log("running on port: ",port);
});