// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));

//express.json({limit...}) doesn't work with error 413 (payload too large) => use BodyParser instead!
// app.use(express.json());
//limit files size:
// app.use(express.json({ limit: "50mb", extended: true }));
// app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
//--------------------------------------
// const postRoutes = require("./routes/posts");
import postRoutes from "./routes/posts.js";
app.use("/posts", postRoutes);
//------------------------------------
// require("dotenv").config();
dotenv.config();
// console.log(process.env.CONNECTION_URL);

//===================================
const CONNECTION_URL = process.env.CONNECTION_URL || "mongodb://localhost:27017/memories";
// console.log(CONNECTION_URL);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
