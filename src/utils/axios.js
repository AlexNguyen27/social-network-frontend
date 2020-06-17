import axios from 'axios';

export default axios.create({
  baseURL: "http://24d8f7a78c3e.ngrok.io/"
  // baseURL: 'http://localhost:8080/',
});
