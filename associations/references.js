var mongoose = require("mongoose");
var Post = require("./models/post.js")
var User = require("./models/user.js")

mongoose.connect("mongodb://localhost:27017/blog_demo_2", {useNewUrlParser: true});

//USER - name, email . We define a model    


// I've said that in the user schema there's a post attribute and it's an array but rather than being an
// array of posts like we have here.
// Or it's an array of the post schema.
// It's actually an array of object IDs.
// And this is just the way that we write that syntax.
// It's a mongoose object id belonging to a post and we can save.

// Here, instead of embedding the entire post ( in a array inside the user object ) like we did before, we use now references by id. 



// Post.create({
//     title: "Como tirarme un pedo parte 3",
//     content: "Que olor a mierda!"
// }, function(err, newpost){
//     User.findOne({name: "Bob Belcher"}, function(err, foundUser){
//         if(err){
//             console.log(err)
//         } else {
//             foundUser.posts.push(newpost);
//             foundUser.save(function(err, data){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     console.log(data)
//                 };
//             });
//         };
//     }); 
// });

//Find User 
//Find all posts for that user 

// So we're finding a user.
// And then we're changing this populate posts which will actually populate the field posts, look up all
// those object IDs, find the correct data and then stick it in the post array and then we run exec to actually
// start the query.

User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
    if(err){
        console.log(err)
    } else {
        console.log(user); //If works, our user is going to have all the posts pre-populated inside the posts attribute.
    };
});



