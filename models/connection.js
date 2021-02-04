const mongoose = require('mongoose');
const { dbURL } = require('../config');

//LocalHost
//const databaseURL = 'mongodb://localhost:27017/app';

//Ranjo's DB
//'mongodb+srv://JRanjo:PC1H7qgqj0zn78oh@localeats.yuxqg.mongodb.net/LocalEats?authSource=admin&replicaSet=atlas-132e5i-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true';

//Sta. Ana's DB
//const databaseURL = 'mongodb+srv://dbAdmin:2c4AEhlRGVgc36aN@stsweng-localeats.lyrtw.mongodb.net/localeatsdb?retryWrites=true&w=majority'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
};

//mongoose.connect(databaseURL, options);
mongoose.connect(dbURL, options);

//Dropping DB
/*
mongoose.connect(databaseURL, options, function(){
    mongoose.connection.db.dropDatabase();
});
*/

module.exports = mongoose;
