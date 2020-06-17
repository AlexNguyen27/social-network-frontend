import axios from 'axios';

export default axios.create({
  // baseURL: "http://f5282c47b22b.ngrok.io/"
  baseURL: 'http://localhost:8080/',
});
