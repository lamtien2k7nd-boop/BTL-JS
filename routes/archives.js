const express = require('express');
const router = express.Router();

router.get('/archives', (req, res) => {
    res.render('archives', {
        title: 'Kho tài liệu',
        documents: [] // tạm để rỗng, sau này fetch data vào
    });
});

module.exports = router;