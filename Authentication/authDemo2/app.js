var  express                = require("express"),
     mongoose               = require("mongoose"),
     bodyParser             = require("body-parser"),
     passport               = require("passport"),
     localStrategy          = require("passport-local"),
     passportLocalMongoose  = require("passport-local-mongoose"),
     User                   = require("./models/user.js"),
     app                    = express()
     
mongoose.connect("mongodb://localhost:27017/auth_demo2", { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({extended: true}));

////////////////////////////AUTH SET UP///////////////////////////

app.use(require("express-session")({
    secret: "ready to talk to cortana",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new localStrategy(User.authenticate()));


///////////////////ROUTES////////////////////////////////

app.get("/", function(req, res){
    res.render("index.ejs")
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret.ejs");
});



//Registration

app.get("/register", function(req, res){
    res.render("register.ejs");
});

app.post("/register", function(req, res){
    User.register( new User({username: req.body.username}), req.body.password, function(err, user){ // USER CREATION
        if(err){
            console.log(err)
            return res.render("register.ejs");
        }
        passport.authenticate("local")(req, res, function(){ 
            res.redirect("/secret");
        });
    });
});

//Login

app.get("/login", function(req, res){
   res.render("login.ejs"); 
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), 
function(req, res){
    
});

//LogOut

app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};



//////////////////////////////////////////////////////////////////////////

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running....");
});