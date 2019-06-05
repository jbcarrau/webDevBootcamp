var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true }); //we define cat_app as our DB(if it doen't exist it will create it)
//localhost:27017 is the port number that the mongo deamon is running on 

// This tells mongoose, our js, that I want to add cats to our DB and the new cat should be defined like below (define a SCHEMA for our data)
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema) // Here we take the catSchema and we compiled it into a model (so we have all the methods we want) and save it to a var Cat. We can use now the var Cat to find/create/update/remove 
//"Cat" refers to the singular version of your collection name. In this case, It will make a collection called cats 


// add a new cat to the DataBase 

// var george = new Cat({
//     name: "George",
//     age: 11,
//     temperament: "Grouchy"
// });

// george.save(function(err, cat){ // We are passing the callback function once the save it's done. This is because the .save takes time and/or it may have an error.
//     if(err){
//         console.log("Something went wrong");
//     } else{
//         console.log("We just saved a cat");
//         console.log(cat);
//     }
// });

//In the following syntax we are using a method create, which is a way of combining new Cat and save all in once.
//https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2970968

Cat.create({
    name: "Snow",
    age: 15,
    temperament: "bland"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
})

//Retrieve all cats from the DB and console.log each one 

// Cat.find({}, function(err, cats){
//     if(err){
//         console.log("Oh no, ERROR");
//         console.log(err);
//     } else {
//         console.log("All the cats");
//         console.log(cats);
//     }
// })