const express = require('express');
const bodyParser = require('body-parser');
const getVehicleData = require('../controllers/vehicles.js');
const getCrashRatingAndData = require('../controllers/crash_rating.js');
//const getCrashRatingAndData = require('../services/crash_rating')
const Response = require('../response/response');
const HTTPStatus = require('../constants/http_status');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/api', (req, res) => {
    res.send('This amazing guy works too');
});

router.get('/vehicles/:modelYear/:manufacturer/:model', (req, res) => {
    console.log('query', req.query.withRating);
    const {modelYear, manufacturer, model} = req.params;
    const { withRating } = req.query
    if (withRating) {
        return getCrashRatingAndData(modelYear, manufacturer, model)
            .then((data) => {
                console.log('data from crash', data);
                res.send('On it');
            })
            .catch((err) => {
                console.log('err from crash', err);
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
        });
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