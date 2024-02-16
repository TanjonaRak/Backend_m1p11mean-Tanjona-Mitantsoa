
const express=require('express');
// var server = require("./server");
require('dotenv').config();
var app=express();
const socket_io = require("socket.io");
const io = socket_io();
app.io = io;
const bodyParser=require('body-parser');
const cors=require('cors');
app.use(cors({origin:'http://localhost:4200'}));
app.use(bodyParser.json());
const routes = require('./Route')

// const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://nyainamitantsoa1:w74du1b6ijbmI2QB@projectbs.wmabkvh.mongodb.net/?retryWrites=true&w=majority");
// mongoose.connect(process.env.DB_STRING_LOCAL);

// const User = require('./models/userModels');
const {mongoose}=require('./Utility/Connection');////CONNECTION



app.use("/",routes(io));////ATO NY ROUTE REHETRA

//Manomboka eto 

const cookieParser = require('cookie-parser');
app.use(cors({
    credentials:true,
    origin:['http://localhost:4200']
}));
app.use(cookieParser());
   


app.listen(8888,()=>console.log('the server is running'));////PORT 

// console.log(process.env.HOST)
// server.start();
