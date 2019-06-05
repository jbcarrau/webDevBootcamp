var express = require("express");
var app = express(); 
var bodyParser = require("body-parser"); //To pull out the req.body we first have to install the body-parser.


app.use(bodyParser.urlencoded({extended: true}));//Express doesn't create the req.body for us, we have to tell express to get the req.body. Body parser takes the req.body and parse it into a JS object that we can use and access it.

var friends = ["Marcos", "Luli", "Caro", "Suave", "Cati"];


app.get("/", function(req, res){
    res.render("home.ejs");
});

app.post("/addfriend", function(req, res){
    res.redirect("/friends");
    var newFriend = req.body.newfriend; // req.body is an object that contains all the data from req.body. When we have a form thats making a POST request, all the form data goes in the req.body
    friends.push(newFriend);
    
});

app.get("/friends", function(req, res){
    res.render("friends.ejs", {friends:friends}) 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server listening");
});