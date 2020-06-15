import axios from 'axios';

export default axios.create({
  // baseURL: "https://01d695fe4f24.ngrok.io/"
  baseURL: 'http://localhost:8080/',
});
