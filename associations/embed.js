var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog_demo_2", {useNewUrlParser: true});



//POST - title, content 

var postSchema = new mongoose.Schema({
   title: String, 
   content: String
});

var Post = mongoose.model("post", postSchema);


//USER - name, email . We define a model    

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [postSchema] //To associate them it needs to be the name of the post Schema. The user can access as many posts we define in the array. In order to make this work, we have to define the post Schema first in the file.
});

//This way of associating data is called embedding data. 

var User = mongoose.model("user", userSchema);


// var newUser = new User({
//     name: "Ron Wesley",
//     email: "rwesley@hogwarts.com"
// });

// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "blablablablablabla"
// });


// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     };
// }); 

// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "Are delicious"
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(post);
//     };
// });


// User.findOne({name: "Hermione Granger"}, function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         user.posts.push({
//             title: "3 things I reallt hate",
//             content: "Voldemort, Voldemort, Voldemort"
//         });
//         user.save(function(err, user){
//             if(err){
//                 console.log(err);
//             } else {
//                 console.log(user);
//             };
//         });
//     };
// });
