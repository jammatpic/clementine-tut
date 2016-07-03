"use strict";

function clickHandler(db) {

    var clicks = db.collection("clicks");

    // gets number of clicks from db
    this.getClicks = function(req, res) {
        // stops ID field from showing up in results
        var clickProjection = {"_id":false};

        // finds first doc that meets criteria
        // first arg means no documents are filtered
        clicks.findOne({}, clickProjection, function(err, result) {
            if (err) {
                throw err;
            }

            if (result) {
                // send JSONified result to browser
                res.json(result);

            // if there's no result, then insert a doc that sets clicks to 0, and get the clicks
            } else {
                clicks.insert({"clicks": 0}, function(err) {
                    if (err) {
                        throw err;
                    }
                    clicks.findOne({}, clickProjection, function(err, doc) {
                        if (err) {
                            throw err;
                        }
                        res.json(doc);
                    });
                });
            }
        });
    };

    this.addClick = function(req, res) {
        clicks
            .findAndModify(
                {}, // don't filter
                {"_id": 1}, // sort in ascending order by id
                {$inc: {"clicks": 1}}, // increment clicks by 1
                function(err, result) {
                    if (err) { throw err; }
                    res.json(result); // send JSONified results to browser
                }
            );
    };

    this.resetClicks = function(req, res) {
        clicks
            .update(
                {},
                { "clicks": 0 }, // sets clicks to 0 for any documents found
                function (err, result) {
                    if (err) { throw err; }
                    res.json(result); // send JSONified results to browser
                }
            );
    };
};

module.exports = clickHandler;
