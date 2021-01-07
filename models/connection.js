const mongoose = require('mongoose');

const databaseURL ='mongodb://localhost:27017/app';

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
