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

// delete from 2 collection ie comment document and from post documents private comments array 
module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}