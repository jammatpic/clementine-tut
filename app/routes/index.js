"use strict";

module.exports = function(app) {
    // when this is requested by the client, return an HTML page
    app.route("/")
        .get(function(req, res) {
            // process.cwd() = current working dir
            res.sendFile(process.cwd() + "/public/index.html");
        });
}
