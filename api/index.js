
const express = require("express");
const mongoose = require("mongoose");
const core = require("cors");
const http = require("http");

const app = express();
const port = process.env.PORT || 3001;

app.use(core());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://shubhamjadhav4899_db_user:VIqNmZRhKMYEO5rg@cluster0.z8gvnt8.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });


  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });