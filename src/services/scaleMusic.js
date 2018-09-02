const axios = require('axios');
let url = 'https://scalemusicapi.herokuapp.com'

if (process.env.VUE_APP_APIURL != undefined) {
  url = process.env.VUE_APP_APIURL
}

export default axios.create({
  baseURL: url,
},
);