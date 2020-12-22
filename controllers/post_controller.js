const Post = require('../models/post')
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {

    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success', 'post published');
        return res.redirect('/');
    } catch (error) {
        // console.log('error', error);
        req.flash('error', 'post publisheing error');
        return res.redirect('/');
        // return;
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id
        );
        // .id means converting the object id into string

        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });
            req.flash('success', 'post and associated comment deleted');

            return res.redirect('back');

        } else {
            req.flash('error', 'post can`t be deleted by you');

            return res.redirect('back');
        }
    } catch (error) {
        console.log('error', error);
        return;
    }

}