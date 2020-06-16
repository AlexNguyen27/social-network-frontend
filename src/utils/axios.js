import axios from 'axios';

export default axios.create({
  baseURL: "http://57e63be3f1ad.ngrok.io/"
  // baseURL: 'http://localhost:8080/',
});
