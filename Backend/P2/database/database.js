const mongoose = require("mongoose");
require('../config/config')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  // console.log('Connected to MongoDB ...');
}).catch(err => {
  console.log('Connection to database failed ...\n');
  console.log(err);
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

module.exports = db;