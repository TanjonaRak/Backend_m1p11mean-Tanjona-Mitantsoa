var server = require("./server");
require('dotenv').config();

const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://nyainamitantsoa1:w74du1b6ijbmI2QB@projectbs.wmabkvh.mongodb.net/?retryWrites=true&w=majority");
mongoose.connect(process.env.DB_STRING_LOCAL);

const User = require('./models/userModels');

console.log(process.env.HOST)
server.start();