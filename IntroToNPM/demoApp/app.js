//npm install cat-me (install a package)
//Import the package into our app using the require command 

var cat = require("cat-me"); // The require command looks for a package or a file called 'cat-me' and grab everything it needs from inside /node-modules/cat-me and include it in our variable
var joke = require("knock-knock-jokes");

//Prints out a random cat / the joke 
console.log(cat());
console.log(joke());
//node app.js 