const mongoose = require('mongoose');
const { dbURL } = require('../config');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
};

mongoose.connect(dbURL, options);

module.exports = mongoose;
