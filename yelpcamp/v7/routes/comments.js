var express     = require("express");
var router      = express.Router({mergeParams: true});
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");

//Comments New 

router.get("/new", isLoggedIn, function(req, res){
    //find campground by id 
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new.ejs", {campground: foundCampground});
        };
    });
});

//Comments Create 

router.post("/", isLoggedIn, function(req, res){
    //look up campground using id
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds")
       } else {
            //create new comment
            Comment.create(req.body.comment, function(err, newcomment){
                if(err){
                    console.log(err);
                } else {
                    //connect new comment to campground
                    foundCampground.comments.push(newcomment);
                    foundCampground.save();
                    //redirect campground show page
                    res.redirect("/campgrounds/" + foundCampground._id);
                };
            });
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