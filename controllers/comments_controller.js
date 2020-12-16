const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post1112, function(err, post){

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post1112,
                user: req.user._id
            }, function(err, comment){
                // handle error

                // now in post schema`s comment updated...(rendered alag tha ...now updating the comment in post collection in mongo db)
                post.comments.push(comment);
                // changes made so now save
                post.save();
                res.redirect('/');
            });
        }

    });
}