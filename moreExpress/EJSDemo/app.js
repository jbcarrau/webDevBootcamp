var express = require("express");
var app = express();

app.use(express.static("public")); // This tells express to serve the contents of public dir. Express doesn't automatically serves every single file that it sees. It doesn't serve any file by default aside views dir 
//app.set("view engine", "ejs"); We are telling express we will use ejs files 

//ROUTES

app.get("/", function(req, res){
    res.render("home.ejs");  //embeded javaScript. Express doesn't use plain static js files, instead it  looks for ejs dynamic templates. 
                             //It will look inside the dir views. To use ejs we need first to install the package 'npm install ejs'
})

app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love.ejs", {thingVar: thing}); // To send our var 'thing' through to love.ejs template, we have to define it in the res.render as an object(we can define multiple pieces of data that I want in my template)
})

app.get("/posts", function(req, res){
    var posts = [
        {title: "Me cabe el salchichon!", author: "Merro"},
        {title: "Ay a mi tambien!", author: "Marcos"},
        {title: "Ay si !", author: "Nicof"}
        ];
        
        res.render("posts.ejs", {posts: posts});
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening");
})