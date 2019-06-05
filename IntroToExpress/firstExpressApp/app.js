var express = require("express"); // Imports module express 
var app = express(); //express has a lot of diff methods. We save it to a var so later on we use any method we want. IE app.'method'


//DEFINING A ROUTE 
// "/" => "Hi there"
app.get("/", function(req, res){
    res.send("Hi there!");
});
//get request to "/" and we run a callback function 
//req and res are objects."req" contains all the info about the req that was made that trigger this route
//"res" contains all the info about what we are going to respond with 



// "/bye" => "Goodbye"
app.get("/bye", function(req, res){
    res.send("Goodbye");
});
// "/dog" => "MEOW!"
app.get("/dog", function(req, res){
    res.send("MEOW!");
    console.log("Someone made a request on /dog");
});


app.get("/r/:subredditName", function(req, res){
    var subreddit = req.params.subredditName;
    res.send("Welcome to a " + subreddit.toUpperCase() + " SubReddit");
})

app.get("/r/:subredditName/comments/:id/:title", function(req, res){
    console.log(req.params);
    res.send("Welcome to the COMMENTS PAGE");
})

app.get("*", function(req, res){
    res.send("IMBECIL!");
})

//TELL EXPRESS TO LISTEN FOR REQUESTS( STARTS SERVER )( using method listen ). 

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!");
});

//process.env.PORT will return a number that comes from C9 (c9 server number), we don't hardcode it .It is a n environment variable called "PORT"
//process.env.IP  this also tells express to listen on a particular IP that comes from C9