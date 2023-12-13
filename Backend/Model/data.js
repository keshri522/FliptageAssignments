// this is the schema of the weather data that will be shown to the as a response
const mongoose = require("mongoose");

const LocalData = new mongoose.Schema({
  longitude: { type: Number, required: true },
  lattitude: { type: Number, required: true },

  name: { type: String, required: true },
});
// this is the collection in mongo db which store all the data with that schema
const Data = mongoose.model("Data", LocalData);

module.exports = Data;
