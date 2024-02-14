const app = require('express')();


const http = require('http').Server(app);

const mongoose = require('mongoose');

/*mongoose.connect("mongodb+srv://nyainamitantsoa1:w74du1b6ijbmI2QB@projectbs.wmabkvh.mongodb.net/?retryWrites=true&w=majority");
const User = require('./models/userModels');*/

http.listen(8888, function(){
    console.log("Server is running");
});
