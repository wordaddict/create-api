const rp = require('request-promise');

const getCrashRating = require('../services/crash_rating');
const getvehicleDescription = require('../services/vehicles.js');

function getCrashRatingAndData (modelYear, manufacturer, model) {
    return getvehicleDescription(modelYear, manufacturer, model)
        .then((data) => {
            const { Results, Count } = data;
            return getDataAndLoop(Results, Count);
        });
}
async function getDataAndLoop(Results, Count) {
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
    return {
        Results: resultArray,
        Count
    };
}

module.exports = getCrashRatingAndData;