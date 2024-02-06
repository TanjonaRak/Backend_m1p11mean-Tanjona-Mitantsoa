const app = require('express')();


const http = require('http').Server(app);

const routes = require('./Route')
function start(){
   
    // function onRequest(request, response) {
    //     response.writeHead(200, {"Content-Type": "text/plain"});
    //     response.write("Hello Mita kely");
    //     response.end();
    // }
   
    // http.createServer(onRequest).listen(8888);
    
    console.log("Server is running");
}

exports.start = start;
