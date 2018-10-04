require('dotenv').config();

const rp = require('request-promise');

const config = require('../config/config.js');

const getvehicleDescription = (modelYear, manufacturer, model) => {
  const options = {
    method: 'GET',
    uri: `${config.url.nhtsa}${modelYear}/make/${manufacturer}/model/${model}?format=json`,
    headers: {
      'Content-Type': 'application/json'
    },
    json: true
  };
    return rp(options);
}

module.exports = getvehicleDescription;