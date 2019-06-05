var express     = require("express");
var router      = express.Router();
var User        = require("../models/user");
var passport    = require("passport");

//Root Route

router.get("/", function(req, res){
    res.render("landing.ejs");
});

//show Sign Up Form 

router.get("/register", function(req, res){
    res.render("register.ejs")
});

//Handle Sign Up logic 

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err)
            req.flash("error", err.message);
            return res.render("register.ejs");
        } 
        passport.authenticate("local")(req, res, function(){ // passport.authenticate()(): 
        req.flash("success", "Welcome " + user.username);
            res.redirect("/campgrounds")
        });
    });
});

// Show LogIn Form

router.get("/login", function(req, res){
    res.render("login.ejs");
});


//Handling Login Logic

// app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    
    }), function(req, res){
   
});


// LogOut Route 

router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out");
   res.redirect("campgrounds");
});


module.exports = router;