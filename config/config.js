require('dotenv').config();

const config = {
    url: {
        nhtsa: process.env.NHTSA_URL,
        crash_rating_url: process.env.NHTSA_CRASH_RATING_URL
    }
}

module.exports = config;