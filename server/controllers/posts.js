import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
    // console.log(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findBy(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//!!!//
export const createPost = async (req, res) => {
  // const post = req.body;
  // const newPost = new PostMessage(post);
  // try {
  //   await newPost.save();
  //   res.status(201).json(newPost);
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }

  const { title, message, selectedFile, creator, tags } = req.body;
  const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags });
  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//------------------------------------------
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  console.log("1a controllers updatePost _id from req.params", _id);
  const post = req.body;
  console.log("1b controllers updatePost 'post' from req.body", post);

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    console.log("server-controllers-updatePost", _id);
    return res.status(404).send(`No post with id: ${_id}`);
  }
  // const { title, message, selectedFile, creator, tags } = req.body;

  // const newPost = await PostMessage.findById(id)
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    // { title, message, selectedFile, creator, tags },
    { ...post, _id },
    { new: true }
  );
  console.log("2 updatedPost");
  res.json(updatedPost);
};
//====================
//rename 'id' to '_id'
//   const { id: _id } = req.params;
//   console.log(_id);
//   //
//   const post = req.body;
//   console.log(post);

//   if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${id}`);

//   // const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
//   const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
//   // console.log("controllers", updatedPost);
//   console.log("controllers", "UPDATED");

//   res.json(updatedPost);
// };
//=====================etot, no ne rabotaet
//   const { id } = req.params;
//   console.log(id);
//   const { title, message, creator, selectedFile, tags } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     console.log(id);
//     return res.status(404).json({ message: `No post with ID: ${id} found` });
//   }
//   const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

//   await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
//   res.json(updatedPost);
// };
// console.log("controllers", updatePost);
//--------------------------------------
// export const updatePost = async (req, res) => {
//   const { id } = req.params;
//   const { title, message, creator, selectedFile, tags } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//   const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

//   await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

//   res.json(updatedPost);
// };
//----------------------------------
export const deletePost = async (req, res) => {
  const { id } = req.params;
  // console.log("req.params id", id);

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);
  // console.log("controllers", "DELETED");

  res.json({ message: "Post was deleted!" });
};
//-----------------------------------
//OK
export const likePost = async (req, res) => {
  const { id } = req.params;
  console.log("4 server-controllers-LikePost ID", id);

  // console.log("req.params id", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("server-controllers-LikePost NOT valid ID", id);
    return res.status(404).send(`No post with id: ${id}`);
  }

  const post = await PostMessage.findById(id);
  console.log("4a server-controllers-LikePost post findById and id");
  const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
  console.log("4b server-controllers-LikePost updatedPost");

  // res.send("LikePost controller");
  // res.send(console.log("LikePost controller"));
  // res.send(console.log(res));
  res.json(updatedPost);
};
