// This file contains database connection and closing connection functions.

const mongoose = require("mongoose");

// connect to database
const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // to avoid deprecation warnings
    });
    console.log("database connected.");
  } catch (error) {
    console.log(error);
  }
};

// close connection to database
const closeConnectionDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("database connection closed.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB, closeConnectionDB };
