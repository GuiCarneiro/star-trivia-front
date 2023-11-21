import axios from '../../axios-config';
const https = require('https');

export const getCharacters = () => {
  var options = {
    method: 'get',
    params: {},
    headers: {
      'Content-Type': 'application/json',      
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
    json: true
  };

  return new Promise((resolve, reject) => {
    axios(`/api/characters?pagination[pageSize]=100&populate=image_profile`, options)
    .then(response => {
      resolve(response['data']);
    })
    .catch(error => {
      reject(error);
    });
  });
}

export const getTodayChallenge = () => {
  var options = {
    method: 'get',
    params: {},
    headers: {
      'Content-Type': 'application/json',      
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
    json: true
  };

  return new Promise((resolve, reject) => {
    axios(`/api/classic-challenges?filters[$and][0][date][$eq]=${new Date().toJSON().slice(0, 10)}`, options)
    .then(response => {
      resolve(response['data']);
    })
    .catch(error => {
      reject(error);
    });
  });
}

export const getYesterdayChallenge = () => {
  let date = new Date();
  date.setDate(date.getDate() - 1);

  var options = {
    method: 'get',
    params: {},
    headers: {
      'Content-Type': 'application/json',      
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
    json: true
  };

  return new Promise((resolve, reject) => {
    axios(`/api/classic-challenges?filters[$and][0][date][$eq]=${date.toJSON().slice(0, 10)}`, options)
    .then(response => {
      resolve(response['data']);
    })
    .catch(error => {
      reject(error);
    });
  });
}