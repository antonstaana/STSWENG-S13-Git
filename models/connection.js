const mongoose = require('mongoose');

const databaseURL ='url';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
};

mongoose.connect(databaseURL, options);

module.exports = mongoose;
