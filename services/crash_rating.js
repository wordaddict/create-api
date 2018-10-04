require('dotenv').config();

const rp = require('request-promise');

const config = require('../config/config.js');

const getCrashRating = (vehicleId) => {
    const options = {
      method: 'GET',
      uri: `${config.url.crash_rating_url}${vehicleId}?format=json`,
      headers: {
        'Content-Type': 'application/json'
      },
      json: true
    };
      return rp(options);
}

module.exports = getCrashRating;
