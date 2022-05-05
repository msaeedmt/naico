const mongoose = require("mongoose");
const config = require('../config.json')

var mongoDB = `mongodb://${config.database.host}/${config.database.collection_name}`;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB ...');
}).catch(err => {
  console.log('Connection failed ...\n');
  console.log(err);
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

module.exports = db;