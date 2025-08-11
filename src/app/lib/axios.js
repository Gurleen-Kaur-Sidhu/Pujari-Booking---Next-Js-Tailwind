import axios from "axios";
 
const api = axios.create({
  baseURL: "https://pujari-app-backend-production.up.railway.app/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
 
export default api;
