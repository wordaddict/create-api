const rp = require('request-promise');

const config = require('../config/config.js');

const getvehicleDescription = (model_year, menufacturer, model) => {
  console.log('uri', `${config.url.nhtsa}${model_year}/make/${menufacturer}/model/${model}?format=json`)
  const options = {
    method: 'GET',
    uri: `${config.url.nhtsa}${model_year}/make/${menufacturer}/model/${model}?format=json`,
    headers: {
      'Content-Type': 'application/json'
    },
    json: true
  };
    return rp(options);
  }

module.exports = getvehicleDescription;