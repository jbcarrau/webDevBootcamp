var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");

//INDEX - Display a list of all campgrounds

router.get("/", function(req, res){
    
    // Retrieve all campgrounds from DB 
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds});
        };
    });
        
});

//CREATE - Add a new campground to DB 

router.post("/", isLoggedIn, function(req, res){
    var newCamp = req.body.newCampground;
    var newImage = req.body.image;
    var newDesc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: newCamp, image: newImage, description: newDesc};
    //Create new campgrounds and save it to our DB
    Campground.create(newCampground, function(err, campGround){
        if(err){
            console.log(err);
        } else {
            console.log(campGround);
            res.redirect("/campgrounds"); //The default is to redirect to GET request
        }
    });

});

// NEW - Displays a form to create a new campground

router.get("/new",isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs");
});

//SHOW - Shows more info about one campsite
    
router.get("/:id", function(req, res){
    //Find the campground with the provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
    //Render show template with that campground
    res.render("campgrounds/show.ejs", {campground: foundCampground});
        };
    });
});

//Middleware

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    res.redirect("/login");
};

module.exports = router;