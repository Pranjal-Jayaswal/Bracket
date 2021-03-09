const mongoose= require ('mongoose');
//providing connection to db,,,, name of db used,,,runnnig on same system,,, name of the db
const env = require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db=mongoose.connection;

db.on('error',console.error.bind(console,'errorrrr in connecting to db'));

db.once('open',function(){
console.log('successssful in connecting bd');
});
module.exports =db;