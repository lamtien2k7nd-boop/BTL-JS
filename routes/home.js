const express = require('express');
const router = express.Router();

const data = require('../data/home.json');

router.get('/', (req, res) => {
    console.log('Rendering home page with data:', data); // Debug log
    res.render('trangchu', {
        title: 'Trang chủ',
        ...data
    });
});

module.exports = router;