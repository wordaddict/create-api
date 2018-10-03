const express = require('express');
const getVehicleData = require('../controllers/vehicles.js');
const Response = require('../response/response');
const HttpStatus = require('../constants/http_status');

const router = express.Router();

router.get('/api', (req, res) => {
    res.send('This amazing guy works too');
});

router.get('/vehicles/:model_year/:menufacturer/:model', (req, res) => {
    const {model_year, menufacturer, model} = req.params;
    return getVehicleData(model_year, menufacturer, model)
        .then((data) => {
            console.log('final rrrre', data);
            if (data.Results.length === 0) {
                const emptyResponse = new Response(HttpStatus.NO_CONTENT, 'No content available', res, false, data);
                return emptyResponse.res_message();
            }
            const response = new Response(HttpStatus.OK, 'Data gotten successfully', res, false, data);
            return response.res_message();
        });
});

module.exports = router;