// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

// const postRoutes = require("./routes/posts");
import postRoutes from "./routes/posts.js";
app.use("/posts", postRoutes);

app.use(cors());
app.use(express.json());
//limit files size:
// app.use(express.json({ limit: "30mb", extended: true }));
// app.use(express.urlencoded({ limit: "30mb", extended: true }));

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
