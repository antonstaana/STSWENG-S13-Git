const mongoose = require('mongoose');

const databaseURL ='mongodb://localhost:8000/app';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
};

mongoose.connect(databaseURL, options);

module.exports = mongoose;
