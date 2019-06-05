var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    sessions        = require("client-sessions"),
    User            = require("./models/user"),
    bcrypt          = require("bcryptjs")
    
mongoose.connect("mongodb://localhost:27017/svcc_auth", { useNewUrlParser: true });

    
app.use(bodyParser.urlencoded({extended: false }));

app.use(sessions({
    cookieName: "session",
    secret: "someRandomString", // WebServer uses this to handle SignIn and encryption of your cookies
    duration: 30 * 60 * 1000, // to delete the cookie from the browser after 30 mins
    activeDuration: 5 * 60 * 1000, // if the user is active within this interval, extend the session 5 more mins
    httpOnly: true, // Don't let JS code access cookies 
    secure: true, // Only set cookies over https 
    ephemeral: true // Destroy cookies when the browser closes. 
}));
    
    


//======================================
//ROUTES
//======================================

app.get("/", function(req, res){
    res.render("index.jade");
});

app.get("/register", function(req, res){
    res.render("register.jade");
});


app.get("/login", function(req, res){
    res.render("login.jade");
});

app.get("/dashboard", function(req, res){
    if(req.sessions && req.sessions.user){
        User.findOne({email: req.sessions.user.email }, function(err, user){
            if(!user){
                req.sessions.reset();
                res.redirect("/login");
            }
            else {
                res.locals.user = user; 
                res.render("dashboard.jade")
            };
        });
    }
    else {
        res.redirect("/login");
    };
});


///////////////////////////////////AUTH ROUTES/////////////////////////////////////////

//Register

app.post("/register", function(req, res){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    
   var user = new user ({
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       email: req.body.email,
       paswword: hash,
   });
   
   user.save(function(err) {
    if (err) {
      var error = 'Something bad happened! Please try again.';

      if (err.code === 11000) {
        error = 'That email is already taken, please try another.';
      }

      res.render('register.jade', { error: error });
    } else {
      res.redirect('/dashboard');
    }
  });
});

//Login

app.post("/login", function(req, res){
   User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
      res.render('login.jade', { error: "Incorrect email / password." });
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.sessions.user = user; // Tell the session: set this information in a cookie (which contains my user info). Is gonna set that header cookie for us. Set-cookie 
        res.redirect('/dashboard');
      } else {
        res.render('login.jade', { error: "Incorrect email / password." });
      }
    }
  }); 
});

  

  
  
  

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running...");
});
    