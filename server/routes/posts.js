// const express = require("express");
import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("This Works");
});
// router.get("/", getPosts);
// router.post("/", createPost);
// router.get(":/id", getPost);
// router.patch(":/id", updatePost);
// router.delete(":/id", deletePost);
// router.patch("/:id/likePost", likePost);

// module.exports = router;
export default router;
