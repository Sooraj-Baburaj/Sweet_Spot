import axios from 'axios';


const url = "https://sweet-spot-server.herokuapp.com/users"

export const getUsers = () => axios.get(url);
export const getUser = (id) => axios.get(`${url}/${id}`);
export const createUser = (user) => axios.post(url,user);
export const LogInUser = (user) => axios.post(`${url}/valid`,user);
export const followUser = (follower,following) => axios.post(`${url}/follow/${follower}`,{userId: following});