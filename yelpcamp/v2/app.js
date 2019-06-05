var express     = require("express"),
    app         = express(),
    bodyparser  = require("body-parser"),
    mongoose    = require("mongoose")
    
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyparser.urlencoded({extended: true}));

//SCHEMA AND MODEL SET UP

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var campGround = mongoose.model("Campground", campgroundSchema);


//ROUTES


app.get("/", function(req, res){
    res.render("landing.ejs");
});

//INDEX - Display a list of all dogs

app.get("/campgrounds", function(req, res){
    
    // Retrieve all campgrounds from DB 
    
    campGround.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index.ejs", {campgrounds: allCampgrounds});
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
    campGround.create(newCampground, function(err, campGround){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds"); //The default is to redirect to GET request
        }
    });

});

// NEW - Displays a form to create a new campground

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

//SHOW - Shows more info about one campsite
    
app.get("/campgrounds/:id", function(req, res){
    //Find the campground with the provided id
    campGround.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
    //Render show template with that campground
    res.render("show.ejs", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server is running....");
});