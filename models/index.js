const mongoose = require('mongoose');

// See docs: http://mongoosejs.com/docs/promises.html#plugging-in-your-own-promises-library
mongoose.Promise = global.Promise;
mongoose.connect(CONFIG.DB_URI).catch(err => {
  throwError(`Can't connect to MongoDB`);
});

let db = mongoose.connection;
db.once('open', () => {
  console.log(`Connected to MongoDB`);
});
db.on('error', error => {
  console.log('MongoDB error', error);
});

module.exports = {
  //User: require('./user'),
  db: db
};
