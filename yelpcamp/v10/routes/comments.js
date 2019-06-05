var express     = require("express");
var router      = express.Router({mergeParams: true}); // It will merge the params from the campgrounds and the comments together so inside the comment routes we can acces the campgrounds ids 
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

//Comments NEW 

router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by id 
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new.ejs", {campground: foundCampground});
        };
    });
});

//Comments CREATE 

router.post("/", middleware.isLoggedIn, function(req, res){
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
                    //add username and id to comment 
                    newcomment.author.id = req.user._id;
                    newcomment.author.username = req.user.username;
                    //Save the comment 
                    newcomment.save();
                    //connect new comment to campground
                    foundCampground.comments.push(newcomment);
                    foundCampground.save();
                    console.log(newcomment);
                    //redirect campground show page
                    res.redirect("/campgrounds/" + foundCampground._id);
                };
            });
       };
    });
});


// EDIT

// Remember that our comment routes are all nested after campgrounds
// It would look like : /campgrounds/:id/comments/:comment_id/edit
router.get("/:comment_id/edit", middleware.CommentCheckOwnerShip, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
           res.redirect("back") 
        }
        else{
            console.log(req.params.comment_id);
            console.log(req.params.id);
            res.render("comments/edit.ejs", {campground_id: req.params.id, comment: comment}); // We pass jst the id (we only need the id). The req.params.id is referring to the campgrounds id
        };
    });
});

// UPDATE 

router.put("/:comment_id", middleware.CommentCheckOwnerShip, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        };
    });
});


// router.post("/:comment_id/edit", function(){})

// DESTROY 

router.delete("/:comment_id", middleware.CommentCheckOwnerShip, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
            console.log("Cannot Delete");
        }
        else{
            res.redirect("back");
        };
    });
});



module.exports = router;