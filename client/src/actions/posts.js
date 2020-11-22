import { FETCH_ALL, FETCH_ONE, CREATE, UPDATE, LIKE, DELETE } from "../constants/actionTypes";

import * as api from "../api/index";

//Action Creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({
      type: FETCH_ALL,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchPost(id);
    dispatch({
      type: FETCH_ONE,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({
      type: CREATE,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const likePost = (id) => async (dispatch) => {
  console.log("2 CLIENT Actions LikePost ");
  try {
    console.log("2a CLIENT Actions LikePost try await api.LikePost");
    //na servere OK, no ne vozvra64aetsja v DATA!
    const { data } = await api.likePost(id);
    // const response = await api.likePost(id);
    console.log("2aa Client Actions response ");
    // const data = await response.data;
    console.log("2b CLIENT Actions LikePost try dispatch");
    dispatch(console.log("2b inside dispatch"), {
      type: LIKE,
      payload: data,
    });
  } catch (error) {
    console.log("2c Error", error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({
      type: DELETE,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};
