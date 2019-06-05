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
    
//Requiring Routes

var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    authRoutes          = require("./routes/index")
    
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

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(authRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server is running....");
});