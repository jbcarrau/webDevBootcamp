var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: true}));

    var campgrounds = [
        {name:"Salmon Creek", image:"https://farm6.staticflickr.com/5136/5391759757_dd33e4ecc8.jpg"},
        {name:"Mountain Goat's Rest", image:"https://farm6.staticflickr.com/5570/14879150454_848a44fb06.jpg"},
        {name:"Granite Hill", image:"https://farm9.staticflickr.com/8020/7538732802_49a42d28d2.jpg"},
        {name:"Mokuleia", image:"https://farm9.staticflickr.com/8322/7887662552_8667d69960.jpg"}
        ];

//ROUTES

app.get("/", function(req, res){
    res.render("landing.ejs");
})

app.get("/campgrounds", function(req, res){
        
        res.render("campgrounds.ejs", {campgrounds: campgrounds}); 
});

app.post("/campgrounds", function(req, res){
    var newCamp = req.body.newCampground;
    var newImage = req.body.image;
  
    
    var newCampground = {name: newCamp, image: newImage};
    
    campgrounds.push(newCampground);
    res.redirect("/campgrounds"); //The default is to redirect to GET request
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server is running....");
});