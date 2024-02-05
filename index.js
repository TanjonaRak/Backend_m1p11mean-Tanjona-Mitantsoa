var server = require("./server");

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://nyainamitantsoa1:w74du1b6ijbmI2QB@projectbs.wmabkvh.mongodb.net/?retryWrites=true&w=majority");
const User = require('./models/userModels');


server.start();