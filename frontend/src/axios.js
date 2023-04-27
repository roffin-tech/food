import axios from "axios";

window.axios = axios;
axios.defaults.withCredentials = false;
// axios.defaults.baseURL = "http://localhost:8081/api"
let backendUrl =
  process.env.VUE_APP_API_BASE_URL ||
  "http://" + window.location.hostname.toString() + ":8081/api";
  console.log('base', backendUrl)
axios.defaults.baseURL = backendUrl;
