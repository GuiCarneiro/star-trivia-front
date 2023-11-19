import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://strapi-4frq.onrender.com'
});

export default instance;