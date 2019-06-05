var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    PassportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user")
    
mongoose.connect("mongodb://localhost:27017/auth_demo_app", { useNewUrlParser: true });
var app = express();
app.use(bodyParser.urlencoded({extended: true}));

// we are requiring and telling express to use it (all inline).
app.use(require("express-session")({ // Must be used before passport
    secret: "Hola me llamo pepe", // Is used to encode and decode the information in the sessions (the cookie information)
    resave: false,
    saveUninitialized: false
}));

// // Tell express to use passport  
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));// We are creating a new LocalStrategy using the User.authenticate() method that is coming from passportLocalMongoose.
// These 2 methods are responsible for reading the session, taking the data from the session that is encoded and unencoded it (deserialize), then encoding it and putting it back in the session (serialize it)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());  
//User.serializeUser() User here is referring to the var that's requiring ./models/user, where we previously defined UserSchema.plugin(passportLocalMongoose)
//so, serializeUser() is a method that comes with the passport-local-mongoose package and we can use it 

//====================================================
// ROUTES
//====================================================

app.get("/", function(req, res){
    res.render("home.ejs");
});

//Before we do anything, We're going to check if the user is logged in or not, if the user is logged in, then will render this template 
//if the user is not logged in then will redirect them to /login.
app.get("/secret", isLoggedIn, function(req, res){ //before it renders secret, we check if the user is logged in. If it is, return next() and move along.
    res.render("secret.ejs");
});

/////////////////////////////////////////////AUTH ROUTES//////////////////////////////////////////


//Show sign up form 

app.get("/register", function(req, res){
    res.render("register.ejs");
});

//Handling user sign up
//We make a new user object. We don't actually save the password to the database. For now, only the username
//So what we do is we pass the password as a second argument.
//User.register will hash that password and stores it in the database.
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register.ejs");
        }
//So this line here passport authenticate will actually log the user in and will take care of everything in the session. It will store the correct information.
//It will run the serialized user method that we specified before and then we're specifying that we want to use the local strategy.
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});

/////////////////////////////////////////////LOG IN. ROUTES//////////////////////////////////////////

//Render Log in Form
app.get("/login", function(req ,res){
    res.render("login.ejs");
});

//Login Logic
//Middleware. Is some code that runs before our callback here. When our app hits this post route to /login, is going to run that middleware immediately.
//This middleware, checks by authenticating your credentials, taking you username and passwd that are inside the req.body, we don't even have to provide it,
//passport automatically takes them from the req.body and compares it to the username and the hash saved in our DB. 
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
});

//When we log someone out we're not actually changing anything in the database.There's no transaction there.
//What's happening is that passport is destroying all the user data in the session.
//It's no longer keeping track of this user's data in the session from request to request.

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next(); // This next is saying to keep going with what is coming next
  };
  res.redirect("/login");
};

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started.......");
});