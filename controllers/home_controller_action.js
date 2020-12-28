
const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = async function (req, res) {
    try {

        // async so server wait let it finidsh
        let userss = await User.find({});
        return res.render('home', {
            title: "MernSocial | Home",
            posts: posts,
            allUser: userss
        });
    } catch (error) {
        console.log('error', error);
        return;
    }
}

// module.exports.home = function (req, res) {
//     // console.log(req.cookies);
//     // res.cookie('user_id', 25);

//     // Post.find({}, function(err, posts){
//     //     return res.render('home', {
//     //         title: "Codeial | Home",
//     //         posts:  posts
//     //     });
//     // });

//     // populate the user of each post ie fill all data of user not only ObjectID
//     Post.find({})
//         .populate('user')
//         .populate({
//             path: 'comments',
//             populate: {
//                 path: 'user'
//             }
//         }).exec(function (err, posts) {
//             User.find({}, function (err, userss) {
//                 return res.render('home', {
//                     title: "MernSocial | Home",
//                     posts: posts,
//                     allUser: userss
//                 });
//             })

//         })

// }

// module.exports.actionName = function(req, res){}