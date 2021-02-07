const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/app';
//'mongodb+srv://JRanjo:PC1H7qgqj0zn78oh@localeats.yuxqg.mongodb.net/LocalEats?authSource=admin&replicaSet=atlas-132e5i-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
};

mongoose.connect(databaseURL, options);

//Dropping DB
/*
mongoose.connect(databaseURL, options, function(){
    mongoose.connection.db.dropDatabase();
});
*/

module.exports = mongoose;
