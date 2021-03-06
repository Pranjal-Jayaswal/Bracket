const express=require('express');
const cookieParser = require('cookie-parser');
const env = require('./config/environment');
const app=express();
const port =8000;
const db=require('./config/mongoose');
// By default, res.render() will render the view and pass the string of html as a body variable to a file named layout in the views folder
const expressLayouts = require('express-ejs-layouts');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const passportJWT = require('./config/passport-jwt');
const passportGoogle = require('./config/passport_googleOauth_stratergy');
const path = require('path');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const flashcustomMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');


// directing to use session cookie 
app.use(
    sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'cssFile'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/cssFile'
    })
)
// parsing form data and url encoding done 
app.use(express.urlencoded());

// cookieParser passes/verifies or parses data into cookie 
app.use(cookieParser());

// directing to use asets from this file 
app.use(express.static(env.asset_path));

// directing that this app will use layout 
app.use(expressLayouts);

// browser unable to fetch this url
// http://localhost:8000/uploads/users/avatars/avatar-1609117192670

app.use('/uploads',express.static(__dirname+'/uploads'));

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//setting different fields for the created express app
app.set('view engine','ejs');
app.set('views','./views');


// express session encrypts user id and put it in cookie


app.use(session({
    name: 'mernSocial',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,    
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(flashcustomMware.setFlash);

app.use(passport.setAuthenticatedUser);

//middleware directing requesst to routes folder
app.use('/', require('./routes'));

//directing the app to the port(port is a kind of channel) through/on which it will work
app.listen(port,function(err){
    if(err){
        console.log(`error in running server: ${err}`);
    }
    return console.log(`server running on : ${port}`);
})