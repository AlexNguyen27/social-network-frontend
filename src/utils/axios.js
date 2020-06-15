import axios from 'axios';

export default axios.create({
  baseURL: "http://62e99c58c51f.ngrok.io/"
  // baseURL: 'http://localhost:8080/',
});
