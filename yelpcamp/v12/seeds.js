var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");
    
var data = [
    { name: "Lago Falkner",
      image: "https://farm6.staticflickr.com/5298/5431080342_e41f08b140.jpg",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    { name: "Lago Huechulafquen",
      image: "https://farm8.staticflickr.com/7699/17125193900_1d8a442e39.jpg",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    { name: "Campo Berlin",
      image: "https://farm3.staticflickr.com/2393/2311067336_76747d92db.jpg",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
    ]


function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
    // if(err){
    //     console.log(err);
    // }
    // console.log("Removed campground");
    // //Add a few campgrounds
    //     data.forEach(function(seed){
    //         Campground.create(seed, function(err, newcampground){
    //             if(err){
    //                 console.log(err);
    //             } else {
    //                 console.log("added a campground");
    //                 //Create a comment for each campground
    //                 Comment.create(
    //                     {
    //                     text: "This place was great but I wish there was internet",
    //                     author: "Homer"
    //                     }, function(err, comment){
    //                       if(err){
    //                           console.log(err);
    //                       } else {
    //                           newcampground.comments.push(comment);
    //                           newcampground.save();
    //                           console.log("New comment created")
    //                       };
    //                     });
    //                 };
    //             });
    //         });
        });
    };

// This is why we use callbacks.
// So remember when we run campgrounds remove there's no guarantee that the forEach code is going to happen after
// the remove finishes unless we put it inside the callback.
// So we actually want to move the forEach inside of the callback. 
// So what this will do now is wait until we remove all the existing campgrounds and then will add in our
// new campgrounds.


module.exports = seedDB;

