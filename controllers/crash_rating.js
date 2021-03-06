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
    if ( Results.length === 0) {
        return {
            Results: [],
            Count: 0
        };
    }
    let resultArray = [];
    let vehicleId = '';
    let dataObj = {};
    for (let i = 0; i < Results.length; i++) {
        vehicleId = Results[i].VehicleId
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
    return {
        Results: resultArray,
        Count
    };
}

module.exports = getCrashRatingAndData;