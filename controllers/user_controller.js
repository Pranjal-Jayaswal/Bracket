const User = require('../models/user');
const path = require('path');

const fs = require('fs');



module.exports.profilee = function (req, res) {
     User.findById(req.params.id,function(err,link){
          return res.render('user_profile', {
               title: 'User Profile',
               profile_user:link
           });
     })

     // if (req.cookies.user_id){
     //      User.findById(req.cookies.user_id, function(err, user){
     //          if (user){
     //              return res.render('user_profile', {
     //                  title: "User Profile",
     //                  user: user
     //              })
     //          }else{
     //              return res.redirect('/users/signIn');
     //          }
     //      });
     //  }else{
     //      return res.redirect('/users/signIn');

     //  }
}
module.exports.update = async function (req, res) {
     // console.log(req.user.id);
     // console.log(req.params.id);

     // if (req.user.id==req.params.id) {
     //      User.findByIdAndUpdate(req.user.id, {name:req.body.name,email:req.body.email},function(err,user){
     //           return res.redirect('back');
     //      })
     // }else{
     //      return res.status(401).send('bhaag yahan se');
     // }

    if(req.user.id == req.params.id){

     try{

         let user = await User.findById(req.params.id);
         User.uploadedAvatar(req, res, function(err){
             if (err) {console.log('*****Multer Error: ', err)}
             
             user.name = req.body.name;
             user.email = req.body.email;

             if (req.file){

                 if (user.avatar){
                     fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                 }


                 // this is saving the path of the uploaded file into the avatar field in the user
                 user.avatar = User.avatarPath + '/' + req.file.filename;
             }
             user.save();
             return res.redirect('back');
         });

     }catch(err){
         req.flash('error', err);
         return res.redirect('back');
     }


 }else{
     req.flash('error', 'Unauthorized!');
     return res.status(401).send('Unauthorized');
 }
}



module.exports.signUp = function (req, res) {
     if (req.isAuthenticated()){
          return res.redirect('/users/profile');
      }
  
   
     return res.render('user_sign_up', {
          title: "MernSocial | SignUp"
     });
}

module.exports.signIn = function (req, res) {
     if (req.isAuthenticated()){
          return res.redirect('/users/profile');
      }
     
     return res.render('user_sign_in', {
          title: "MernSocial | signIn"
     });
}

module.exports.signOut = function (req, res) {
     console.log(     res.cookies
          );
     return res.render('user_sign_in', {
          title: "MernSocial | signIn"
     });
}




// get the sign up data
module.exports.create = function (req, res) {
     if (req.body.password != req.body.confirm_password) {
          return res.redirect('back');
     }

     User.findOne({ email: req.body.email }, function (err, user) {
          if (err) { console.log('error in finding user in signing up'); return }

          if (!user) {
               User.create(req.body, function (err, user) {
                    if (err) { console.log('error in creating user while signing up'); return }

                    return res.redirect('/users/signIn');
               })
          } else {
               return res.redirect('back');
          }

     });
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
     req.flash('success','yupp u r logged in ');

     return res.redirect('/');
 }

 module.exports.destroySession = function(req, res){
     req.logout();
 req.flash('success','logged out ');
     return res.redirect('/');
 }