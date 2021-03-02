/*var http = require("http");
http.createServer(function (request, response) {

    response.writeHead(200, {'Content-Type': 'text/plain'});

    
}).listen(3000);*/

var express = require("express");
var app = express();


app.get("/", function(request, response) {
    response.sendFile(__dirname + "\\etusivu.html");
});

app.get("/guestbook", function(request, response) {
    response.sendFile(__dirname + "\\viestit.html");
});

app.get("/newmessage", function(request, response) {
    response.send("NEW MESSAGE");
});

app.get("/ajaxmessage", function(request, response) {
    response.send("AJAX MESSAGE");
});

app.get("*", function(request, response) {
    response.send("Etsimääsi sivua ei ole olemassa", 404);
});

app.listen(3000, function() {
    console.log("Kuunnellaan port 3000!");
});