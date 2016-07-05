"use strict";

(function() {
    var addButton = document.querySelector(".btn-add");
    var deleteButton = document.querySelector(".btn-delete");
    var clickNbr = document.querySelector("#click-nbr");
    var apiUrl = "http://localhost:3000/api/clicks";

    function ready(fn) {
        // has to be a function
        if (typeof fn !== "function") {
            return;
        }
        // if document is ready, execute it
        if (document.readyState === "complete") {
            return fn();
        }

        // if document has not loaded, listen for event
        document.addEventListener("DOMContentLoaded", fn, false);
    }

    function ajaxRequest(method, url, callback) {
        var xmlhttp = new XMLHttpRequest();

        // function executed whenever readyState changes
        xmlhttp.onreadystatechange = function() {
            // readyState of 4 means operation has been completed, HTTP status 200 = OK
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                callback(xmlhttp.response);
            }
        };

        // initiates and sends request
        xmlhttp.open(method, url, true);
        xmlhttp.send();
    }

    function updateClickCount(data) {
        var clicksObject = JSON.parse(data);
        clickNbr.innerHTML = clicksObject.clicks;
    }

    ready(ajaxRequest("GET", apiUrl, updateClickCount));

    // adding event listener for add button
    addButton.addEventListener("click", function() {
        ajaxRequest("POST", apiUrl, function() { // POST increments number of clicks
            ajaxRequest("GET", apiUrl, updateClickCount) // GET updates clicks in browser
        });
    }, false);

    // adding event listener for delete button
    deleteButton.addEventListener("click", function() {
        ajaxRequest("DELETE", apiUrl, function() { // reses clicks to 0
            ajaxRequest("GET", apiUrl, updateClickCount) // GET updates clicks in browser
        });
    }, false);

})();
