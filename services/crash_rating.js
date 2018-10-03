const rp = require('request-promise');

const getvehicleDescription = require('./vehicles.js');

const config = require('../config/config.js');

const getCrashRating = (vehicleId) => {
    console.log('uri', `${config.url.crash_rating_url}${vehicleId}?format=json`)
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

const getCrashRatingAndData = (modelYear, manufacturer, model) => {
    return getvehicleDescription(modelYear, manufacturer, model)
        .then((data) => {
            const { Results } = data;
            return getDataAndLoop(Results)
        });
}
async function getDataAndLoop(Results) {
    let resultArray = [];
    let vehicleId = '';
    let dataObj = {};
    for (let i = 0; i < Results.length; i++) {
        vehicleId = Results[i].VehicleId
        console.log('vehicleId', vehicleId);
        await getCrashRating(vehicleId)
            .then((res) => {
                const rating = res.Results[0].OverallRating;
                dataObj = {
                    CrashRating: rating,
                    Description: Results[i].VehicleDescription,
                    VehicleId: Results[i].VehicleId
                }
                resultArray.push(dataObj);
            })
    }
    console.log('data gotten crash rating service', resultArray);
    return resultArray;
    }

module.exports = getCrashRatingAndData;
