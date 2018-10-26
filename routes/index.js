var express = require('express');
var router = express.Router();
var fs = require("fs");
var request = require("request");

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("In root");
    res.sendFile("Forms.html", { root: "public" });
});

router.get("/definition", function(req, res, next) {
    console.log("In definition");
    var definitionURL = "https://owlbot.info/api/v1/dictionary/" + req.query.q;
    request(definitionURL).pipe(res);
});

router.get("/getcity", function(req, res, next) {
    console.log("In getcity");
    var regEx = RegExp("^" + req.query.q);

    fs.readFile(__dirname + "/cities.dat.txt", function(err, data) {
        if (err) {
            throw (err);
        }

        var matchingCities = [];
        var cities = data.toString().split("\n");
        cities.forEach(function(item) {
            var result = item.search(regEx);
            if (result != -1) {
                matchingCities.push({ city: item });
            }
        });

        res.status(200).json(matchingCities);
    });
});

module.exports = router;
