var express             = require("express"),
    app                 = express(),
    bodyparser          = require("body-parser"),
    mongoose            = require("mongoose"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer")
    
//APP CONFIG
    
mongoose.connect("mongodb://localhost:27017/restfull_blog_app", {useNewUrlParser: true});
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"))//So now we've told our app whenever you get a request that has underscore method as a parameter,
//take whatever it's equal to PUT, GET, POST, PATCH, DELETE, whatever it is, for us it will be put and delete
//and treat that request as a PUT request or as the delete request.
//We pass the argument _method because it is what it will look for in the URL
    
//Mongoose SCHEMA and MODEL SET UP 

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("blog", blogSchema);

//RESTFULL ROUTES

//INDEX

app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, allBlogs){
    if(err){
        console.log(err);
    } else {
        res.render("index.ejs", {data: allBlogs});
    }
});
});

//NEW 

app.get("/blogs/new", function(req, res){
    res.render("new.ejs")
});

//CREATE 

app.post("/blogs", function(req, res){
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log("#####################################");
    console.log(req.body);
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
            res.render("show.ejs", {blog: foundBlog});
        };
    });
}); 

//EDIT 

app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("blogs");
        } else {
            res.render("edit.ejs", {blog: foundBlog});
        };
    });
});

//UPDATE 

app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        };
    });
});

//DELETE

app.delete("/blogs/:id", function(req, res){
    //Destroy blog and redirect somewhere 
    Blog.findByIdAndRemove(req.params.id, function(err){ //We just pass the err argument. We don't expect any data back. 
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs"); 
        };
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Running...")
})



