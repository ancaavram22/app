/* eslint-disable no-console */
const mongoose = require('mongoose');

module.exports = function connectToDB(req, res, next) {
  mongoose.connect(
    'mongodb+srv://admin:admin@myprojects.akk0t.mongodb.net/projectdp?retryWrites=true&w=majority',
  )
    .then(() => console.log('Connected'))
    .catch((e) => console.log(e));
  next();
};
