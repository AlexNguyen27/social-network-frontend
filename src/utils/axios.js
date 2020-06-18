import axios from 'axios';

export default axios.create({
  baseURL: "http://e7f82cff02a0.ngrok.io/"
  // baseURL: 'http://localhost:8080/',
});
