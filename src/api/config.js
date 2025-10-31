import axios from "axios";
const user = JSON.parse(localStorage.getItem("user") || "{}");

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: user.tokne ? `Bearer ${user.token}` : "",
  },
});

export default api;
