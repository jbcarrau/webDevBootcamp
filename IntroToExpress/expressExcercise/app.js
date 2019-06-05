var express = require("express");
var app = express();

//Set ROUTES 


app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment");
})

app.get("/speak/:animals", function(req, res){
    var sound = {
        pig: "oink",
        dog: "woof",
        cat: "meow",
    };
    var animal = req.params.animals.toLowerCase();
    var sound = sound[animal];
    
    res.send("The " + animal + " says " + "'" + sound + "'");
   
});

//We can only do res.send() one time. When we make a request from a website we only get one response back

app.get("/repeat/:hello/:number", function(req, res){
    var num = Number(req.params.number);
    var word = req.params.hello;
    var x = "";
    
    for(var i = 0 ; i < num ; i++){
        x += word + " ";
    }
    res.send(x);
})

// res.send(word.repeat(num));


app.get("*", function(req, res){
    res.send("Sorry page not found.....What are you doing with your life")
})

//Set express to listen for requests
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
})

