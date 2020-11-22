import axios from "axios";

const api = axios.create({
  //   baseURL: "http://localhost:5000/posts",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    // "Access-Control-Allow-Origin": "*",
    // APITOKEN: API_TOKEN,
  },
});
// console.log(api);

const url = "http://localhost:5000/posts";
//api calls:
//all posts from db
export const fetchPosts = () => api.get(url);
export const fetchPost = (id) => api.get(`${url}/${id}`);
export const createPost = (newPost) => api.post(url, newPost);
export const updatePost = (id, updatedPost) => {
  api.patch(`${url}/${id}`, updatedPost);
};
export const likePost = (id) => {
  console.log("3 client api like");
  api.patch(`${url}/${id}/likePost`);
};

export const deletePost = (id) => api.delete(`${url}/${id}`);
