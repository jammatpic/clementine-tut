"use strict";

var express = require("express"),
    routes = require("./app/routes/index.js"),
    mongo = require("mongodb").MongoClient;

var app = express();

// connects to DB
mongo.connect("mongodb://localhost:27017/clementinejs", function(err, db) {

    if (err) {
        throw new Error("Database failed to connect!");
    } else {
        console.log("MongoDB successfully connected on port 27017.");
    }

    // references that build a directory path to /public and /controllers
    app.use("/public", express.static(process.cwd() + "/public"));
    app.use("/controllers", express.static(process.cwd() + "/app/controllers"));

    routes(app, db);

    // tells node which port to listen on, and provides a callback that prints a message to the console
    app.listen(3000, function() {
        console.log("Listening on port 3000");
    });

});
