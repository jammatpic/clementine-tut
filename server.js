"use strict";

var express = require("express"),
    routes = require("./app/routes/index.js");

var app = express();

routes(app);

// tells node which port to listen on, and provides a callback that prints a message to the console
app.listen(3000, function() {
    console.log("Listening on port 3000");
});
