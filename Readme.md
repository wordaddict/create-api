This is the Vehicle data and crash rating API

Author: Adeyinka Micheal

Environments
Node version - v8.12.0 (LTS)

NPM version - v6.4.1

install all packages with
npm install

start the application with
npm run start

start the test with
npm run test

Run lint with (Linting was done using Airbnb standard)
npm run lint

1) The first endpoint is a GET method-
Endpoint - /vehicles/:modelYear/:manufacturer/:model - Gets vehicle data
with - modelYear
     - manufacturer
     - model

As query parameters
Response format

application/json

2) With an addition query parameter withRating=true
Endpoint - /vehicles/:modelYear/:manufacturer/:model?withRating=true
The Crash rating is added in the Response

3) second endpoint posts the data as json payload and gets back vehicle data
/vehicles

with a sample payload
{
    "modelYear": 2015,
    "manufacturer": "Audi",
    "model": "A3"
}

Returns the same response as 1

#-------------------------------Environment variables--------------------------------------------------

 Just as provided in sample.env

NHTSA_URL=''
NHTSA_CRASH_RATING_URL=''

where NHTSA_URL is an endpoint used to get the Vehicle Id and Description
And NHTSA_CRASH_RATING_URL is the endpoint that takes VehicleId and gets Crash rating