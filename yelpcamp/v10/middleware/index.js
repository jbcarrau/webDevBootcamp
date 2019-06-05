var Campground  = require("../models/campground");
var Comment     = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkOwnerShip = function(req, res, next){
    //Is user logged in ? 
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            }
            else {
                //Does currentUser owns the campground?
                console.log(foundCampground.author.id); // This is an mongoose object 
                console.log(req.user._id);              // This is a String. foundCampground.author.id === req.user._id)  We cannot campare them
                if(foundCampground.author.id.equals(req.user._id)){ // Instead, we use a mongoose method
                    next();
                } else {
                    res.redirect("back");
                };
            };
        });
        }
    else {
        res.redirect("back");
    };
};


middlewareObj.CommentCheckOwnerShip = function(req, res, next){
    //Is user logged in ? 
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }
            else {
                //Does currentUser wrote the comment?
                console.log(foundComment.author.id);  
                console.log(req.params.comment_id);              
                if(foundComment.author.id.equals(req.user.id)){
                    next();
                } else {
                    res.redirect("back");
                };
            };
        });
        }
    else {
        res.redirect("back");
    };
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    req.flash("error", "Please Login First"); // This doesn't display anything. It only gives us the capability to do it 
    res.redirect("/login");
};


module.exports = middlewareObj;