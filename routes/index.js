const express = require('express');
const bodyParser = require('body-parser');
const getVehicleData = require('../controllers/vehicles.js');
const getCrashRatingAndData = require('../controllers/crash_rating.js');
const Response = require('../response/response');
const HTTPStatus = require('../constants/http_status');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/vehicles/:modelYear/:manufacturer/:model', (req, res) => {
    const { modelYear, manufacturer, model } = req.params;
    const { withRating } = req.query
    if (withRating) {
        return getCrashRatingAndData(modelYear, manufacturer, model)
            .then((data) => {
                if (data.Results.length === 0) {
                    const emptyResponse = new Response(HTTPStatus.NO_CONTENT, 'No content available', res, false, data);
                    return emptyResponse.res_message();
                }
                const resp = new Response(HTTPStatus.OK, 'Data gotten successfully', res, false, data);
                return resp.res_message();
            })
            .catch((err) => {
                console.log('err from getting vehicle and crash data', err);
            });
    }
    console.log(modelYear, manufacturer, model)
    return getVehicleData(modelYear, manufacturer, model)
        .then((data) => {
            console.log('final rrrre', data);
            if (data.Results.length === 0) {
                const emptyResponse = new Response(HTTPStatus.NO_CONTENT, 'No content available', res, false, data);
                return emptyResponse.res_message();
            }
            const response = new Response(HTTPStatus.OK, 'Data gotten successfully', res, false, data);
            return response.res_message();
        })
        .catch((err) => {
            console.log('err from getting vehicle data', err);
        })
});

router.post('/vehicles', (req, res) => {
    const { modelYear, manufacturer, model } = req.body;
    return getVehicleData(modelYear, manufacturer, model)
    .then((data) => {
        console.log('final rrrre', data);
        if (data.Results.length === 0) {
            const emptyResponse = new Response(HTTPStatus.NO_CONTENT, 'No content available', res, false, data);
            return emptyResponse.res_message();
        }
        const response = new Response(HTTPStatus.OK, 'Data gotten successfully', res, false, data);
        return response.res_message();
    });
})

module.exports = router;