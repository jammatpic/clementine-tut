"use strict";

var ClickHandler = require(process.cwd() + "/app/controllers/clickHandler.server.js");

module.exports = function(app, db) {

    var clickHandler = new ClickHandler(db);

    // when this is requested by the client, return an HTML page
    app.route("/")
        .get(function(req, res) {
            // process.cwd() = current working dir
            res.sendFile(process.cwd() + "/public/index.html");
        });

    // get, post, and delete at /api/clicks
    app.route("/api/clicks")
        .get(clickHandler.getClicks)
        .post(clickHandler.addClick)
        .delete(clickHandler.resetClicks);
};
