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
            return res.render("register.ejs");
        } 
        passport.authenticate("local")(req, res, function(){ // passport.authenticate()(): 
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
        falilureRedirect: "/login"
    
    }), function(req, res){
   
});


// LogOut Route 

router.get("/logout", function(req, res){
   req.logout();
   res.redirect("campgrounds");
});

//Middleware

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    res.redirect("/login");
};

module.exports = router;