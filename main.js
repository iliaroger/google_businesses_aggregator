const axios = require('axios');
require('dotenv').config;

const api_key = process.env.GOOGLE_API_KEY;
const business_type = 'restaurant';
const location = '50.110924, 8.682127';

let get_places_id_config = {
  method: 'get',
  url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${business_type}&location=${location}&radius=10000&key=${api_key}`,
  headers: {},
};

const id_filter = (e) => {
  return e.place_id;
};

const getEmails = async () => {
  const get_places = await axios(get_places_id_config)
    .then(function (response) {
      const data = response.data.results;
      return data.map(id_filter);
    })
    .catch(function (error) {
      console.log(error);
    });

  const get_websites = await get_places.map(async (e) => {
    const data = await axios({
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${e}&key=${api_key}`,
      headers: {},
    });

    return data.data.result.website;
  });

  const data = await Promise.all(get_websites);

  console.log(data);
};

getEmails();
