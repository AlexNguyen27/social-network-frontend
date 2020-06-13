import axios from 'axios';

export default axios.create({
  //   baseURL: "https://mycollege-dev.herokuapp.com/"
  baseURL: 'http://localhost:8080/',
});
