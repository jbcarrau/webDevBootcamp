var express         = require("express");
var app             = express(); 
var mongoose        = require("mongoose");
var bodyParser      = require("body-parser");
var methodOverride  = require("method-override");

//APP USE 

mongoose.connect("mongodb://localhost:27017/v2RESTfullBlogApp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));

//SET MONGOOSE SCHEMA AND MODEL 

var blogSchema= mongoose.Schema({
    title: String,
    image: String, 
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("blog", blogSchema);


//ROUTES 

//INDEX

app.get("/", function(req, res){
    res.redirect("/blogs");
    });

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("index.ejs", {blog: foundBlog});
        };
    });
});

//NEW 

app.get("/blogs/new", function(req, res){
    res.render("new.ejs");
});

//CREATE

app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new.ejs");
        } else {
            res.redirect("/blogs");
        };
    });
});


//SHOW 

app.get("/blogs/:id", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("show.ejs", {data: foundBlog});
       };
   });
});

//EDIT

app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit.ejs", {data: foundBlog})
        };
    });
});

//UPDATE 

app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        };
    });
});

//DELETE

app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs")
        } else {
            res.redirect("/blogs");
        };
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running....");
});