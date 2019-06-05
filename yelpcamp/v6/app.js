var express         = require("express"),
    app             = express(),
    bodyparser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comment"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user")
    
mongoose.connect("mongodb://localhost:27017/yelp_camp_v6", { useNewUrlParser: true });
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

seedDB();    

//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "ME voy a tirar un pedo",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// To pass req.user to every template. Whatever we put inside res.locals, is available in our templates 
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//ROUTES

app.get("/", function(req, res){
    res.render("landing.ejs");
});

//INDEX - Display a list of all dogs

app.get("/campgrounds", function(req, res){
    
    // Retrieve all campgrounds from DB 
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds});
        };
    });
        
});

//CREATE - Add a new dog to DB 

app.post("/campgrounds", function(req, res){
    var newCamp = req.body.newCampground;
    var newImage = req.body.image;
    var newDesc = req.body.description;
    var newCampground = {name: newCamp, image: newImage, description: newDesc};
    
    //Create new campgrounds and save it to our DB
    Campground.create(newCampground, function(err, campGround){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds"); //The default is to redirect to GET request
        }
    });

});

// NEW - Displays a form to create a new campground

app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new.ejs");
});

//SHOW - Shows more info about one campsite
    
app.get("/campgrounds/:id", function(req, res){
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


// ===============================================================================
// COMMENT ROUTES
// ===============================================================================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    //find campground by id 
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new.ejs", {campground: foundCampground});
        };
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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


// ===============================================================================
// AUTHENTICATION ROUTES
// ===============================================================================

//show Sign Up Form 

app.get("/register", function(req, res){
    res.render("register.ejs")
});

//Handle Sign Up logic 

app.post("/register", function(req, res){
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

app.get("/login", function(req, res){
    res.render("login.ejs");
});


//Handling Login Logic

// app.post("/login", middleware, callback)
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    
    }), function(req, res){
   
});


// LogOut Route 

app.get("/logout", function(req, res){
   req.logout();
   res.redirect("campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server is running....");
});