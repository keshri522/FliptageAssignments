// creating data base connection..
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// creating database connection .
const DatabaseConnection = async () => {
  try {
    const DataBaseUri = `mongodb+srv://rkeshri522:${process.env.password}@cluster0.pmobmox.mongodb.net/FitPage?retryWrites=true&w=majority`;
    const connect = await mongoose.connect(DataBaseUri, {});
    console.log("Database connected Sucessfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = DatabaseConnection;
