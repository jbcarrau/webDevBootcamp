var express = require("express");
var app = express();
var request = require("request");

//ROUTES

app.get("/", function(req, res){
    res.render("search.ejs");
})

app.get("/results", function(req, res){
    var result = req.query.movie;
    var url = "http://www.omdbapi.com/?s=" + result + "&apikey=thewdb";
    request(url, function(error, response, body){
        if(!error & response.statusCode == 200){
           var parsedData = JSON.parse(body);
           res.render("result.ejs", {data: parsedData});
        };
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running..."); 
})