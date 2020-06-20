import axios from 'axios';

export default axios.create({
  baseURL: "http://95675ef32084.ngrok.io/",
  // baseURL: 'https://elearning-server-2020.herokuapp.com/',
  // baseURL: 'http://localhost:8080/',
});
