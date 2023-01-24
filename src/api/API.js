import axios from "axios";

const API = axios.create({
  baseURL: "https://frontend-take-home.fetchrewards.com",
});

export default API;
