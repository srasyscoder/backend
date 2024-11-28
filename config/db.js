require('dotenv').config()
const mongoose = require('mongoose');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const connectDB = async () => {
  
  try {
    const mongoURI = process.env.MONGO_URI;
    //console.log('mongoURI: ', mongoURI);

    if (!mongoURI) {
      console.error('MongoDB connection string is missing!');
      process.exit(1);
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
