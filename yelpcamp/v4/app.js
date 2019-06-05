var express     = require("express"),
    app         = express(),
    bodyparser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment")
    
mongoose.connect("mongodb://localhost:27017/yelp_camp_v3", { useNewUrlParser: true });
app.use(bodyparser.urlencoded({extended: true}));
seedDB();    

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
        }
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

app.get("/campgrounds/:id/comments/new", function(req, res){
    //find campground by id 
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new.ejs", {campground: foundCampground});
        };
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server is running....");
});