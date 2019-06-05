var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware"); // We don't need to specify index.js. It will automatically look for it if we do't specify it. 

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

router.post("/", middleware.isLoggedIn, function(req, res){
    var newCamp = req.body.newCampground;
    var newImage = req.body.image;
    var price   = req.body.price;
    var newDesc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: newCamp, price: price, image: newImage, description: newDesc, author: author};
    //Create new campgrounds and save it to our DB
    Campground.create(newCampground, function(err, campGround){
        if(err){
            console.log(err);
        } else {
            console.log(campGround);
            req.flash("success", "Successfully created campground");
            res.redirect("/campgrounds"); //The default is to redirect to GET request
        }
    });

});

// NEW - Displays a form to create a new campground

router.get("/new", middleware.isLoggedIn, function(req, res){
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

//EDIT campground ROUTE 

router.get("/:id/edit", middleware.checkOwnerShip, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit.ejs", {campground: foundCampground});
    });
});


//UPDATE campground ROUTE 

router.put("/:id", middleware.checkOwnerShip, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedCamp){
        if(err){
            res.redirect("/campgrounds");
        }
        else{ 
            req.flash("success", "Successfully updated");
            res.redirect("/campgrounds/" + req.params.id);
        };
    });
});

//DESTROY campground ROUTE 

router.delete("/:id", middleware.checkOwnerShip, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            req.flash("success", "Campground successfully deleted");
            res.redirect("/campgrounds");
        };
    });
});


module.exports = router;