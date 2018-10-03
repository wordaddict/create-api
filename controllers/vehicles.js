const rp = require('request-promise');

const config = require('../config/config.js');
const getvehicleDescription = require('../services/vehicles.js')

const getVehicleData = (model_year, menufacturer, model) => {
    return getvehicleDescription(model_year, menufacturer, model)
        .then((data) => {
            const { Results, Count } = data;
            if ( Results.length === 0) {
                return {
                    Results: [],
                    Count: 0
                };
            }
            let resultsArray = [];
            for (let i = 0; i < Results.length; i++) {
                const data = {
                    Description: Results[i].VehicleDescription,
                    VehicleId: Results[i].VehicleId
                }
                resultsArray.push(data);
            }
            console.log('data gotten from the service', resultsArray);
            return {
                Results: resultsArray,
                Count
            };
        })
        .catch((err) => {
            console.log('Unable to get data from the service', err);
        });
};

module.exports = getVehicleData;