const express = require('express');

const router = express.Router();

router.get('/api', (req, res) => {
    res.send('This amazing guy works too');
});

module.exports = router;