import axios from "axios";

// const url = "https://sweet-spot-server.herokuapp.com/posts"
const url = "http://localhost:5000/posts"

export const getPosts = () => axios.get(url);
export const getFeeds = (num) => axios.get(`${url}/${num}`);
export const createPost = (post) => axios.post(url,post); 
export const likePost = (id,like) => axios.patch(`${url}/like/${id}`, like);
export const postThumbs = (id) => axios.get(`${url}/postThumbs/${id}`);