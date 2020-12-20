const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersConrtollerr = require('../controllers/user_controller');


router.get('/profile/:id',passport.checkAuthentication, usersConrtollerr.profilee);
router.post('/update/:id', usersConrtollerr.update);

router.get('/signUp', usersConrtollerr.signUp);
router.get('/signIn', usersConrtollerr.signIn);
router.post('/create', usersConrtollerr.create);
router.get('/sign-out', usersConrtollerr.destroySession);

// use passport as a middleware to authenticate
router.post('/create-Session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersConrtollerr.createSession);



// router.get('/signOut', usersConrtollerr.signOut);
// router.post('/create-session', usersConrtollerr.createSession);
module.exports = router;