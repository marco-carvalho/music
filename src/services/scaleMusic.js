const axios = require('axios');

const isProd = process.env.NODE_ENV === 'production';
let url = isProd ? 'https://scalemusicapi.herokuapp.com' : '//localhost:3000';

export default axios.create({
  baseURL: url,
});