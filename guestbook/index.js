
var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response) {
    response.sendFile(__dirname + "\\index.html");
});

app.get("/guestbook", function(request, response) {
    var data = require("./guestbook-data.json");
    var output = "<table width='100%' border=2px cellpadding='15' style='border-collapse:collapse;'><tr><th><a href='/'>Takaisin etusivulle</a></th><th>Käyttäjänimi</th><th>Maa</th><th>Viesti</th></tr>";

    for (var i = 0; i < data.length; i++) {
        output += "<tr><td>" + (i+1) + "</td><td>" + data[i].username + "</td><td>" + data[i].country + "</td><td>" + data[i].message + "</td></tr>";
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

    var fs = require("fs");

    var tiedosto = "./guestbook-data.json";
    var guestbookdata = require(tiedosto);

    var newMessage = {
        username: request.body.username,
        country: request.body.country,
        date: new Date(),
        message: request.body.message
    };

    guestbookdata.push(newMessage);

    fs.writeFile(tiedosto, JSON.stringify(guestbookdata), function(err) {
        if (err) return console.log(err);
        console.log("Tallennetaan tiedostoon...")
    });

    response.send("Viestisi '" + message + "' on lähetetty " + username + "!");
});

app.get("/ajaxmessage", function(request, response) {
    response.sendFile(__dirname + "\\ajaxmessage.html");
});

app.get("*", function(request, response) {
    response.send("Etsimääsi sivua ei ole olemassa", 404);
});

app.listen(3000, function() {
    console.log("Kuunnellaan porttia 3000!");
});