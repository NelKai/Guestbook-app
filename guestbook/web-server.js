/*var http = require("http");
http.createServer(function (request, response) {

    response.writeHead(200, {'Content-Type': 'text/plain'});

    
}).listen(3000);*/

var express = require("express");
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));


//console.log(data);

//app.use(express.static("./guestbookSite"));

var messages = [];


app.get("/", function(request, response) {
    response.sendFile(__dirname + "\\index.html");
});

app.get("/guestbook", function(request, response) {
    //response.sendFile(__dirname + "\\viestit.html");
    var data = require("./guestbook-data.json");
    var output = "<table border=2px cellpadding='15' style='border-collapse:collapse;'><tr><th>Käyttäjänimi</th><th>Maa</th><th>Viesti</th></tr>";

    for (var i = 0; i < data.length; i++) {
        output += "<tr><td>" + data[i].username + "</td><td>" + data[i].country + "</td><td>" + data[i].message + "</td></tr>";
    }
    output += "</table>";

    response.send(output);
    
});

app.get("/newmessage", function(request, response) {
    response.sendFile(__dirname + "\\newmessage.html");
});

app.post("/mymessage", function(request, response) {
    var username = request.body.username;
    var message = request.body.message;

    /*
    var newMessage = {
        username: request.body.username,
        content: request.body.message,
        date: new Date()
    };
    messages.push(newMessage);
    console.log(messages[0]);
    */

    var fs = require("fs");

    var guestbookdata = require("./guestbook-data.json");

    var newMessage = {
        username: request.body.username,
        country: request.body.country,
        date: new Date(),
        message: request.body.message
    };

    guestbookdata.push(newMessage);

    fs.writeFile("./guestbook-data.json", JSON.stringify(guestbookdata), function(err) {
        if (err) return console.log(err);
    });

    //console.log(request.body);
    response.send("Viestisi '" + message + "' on lähetetty " + username + "!");
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