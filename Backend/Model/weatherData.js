// this is the schema of the weather data that will be shown to the as a response
const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  windSpeed: { type: Number, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  visibility: { type: Number, required: true },
  sunrise: { type: Number, required: true },
  sunset: { type: Number, required: true },
  name: { type: String, required: true },
});
// this is the collection in mongo db which store all the data with that schema
const Weather = mongoose.model("Weather", weatherSchema);

module.exports = Weather;
