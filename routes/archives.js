const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const archivesDataPath = path.join(__dirname, '../data/archives.json');
let archivesData = [];
try {
    archivesData = JSON.parse(fs.readFileSync(archivesDataPath, 'utf8'));
} catch (err) {
    console.error("Error reading archives.json:", err);
}

router.get('/:id', (req, res) => {
    const archiveId = req.params.id;
    const categoryInfo = archivesData.find(item => item.id === archiveId);

    if (categoryInfo) {
        res.render('category_achives', {
            title: categoryInfo.title,
            category: categoryInfo.title,
            description: categoryInfo.description,
            testsdata: categoryInfo.tests
        });
    } else {
        res.render('category_achives', {
            title: 'Kho tài liệu',
            category: 'Không tìm thấy',
            description: 'Danh mục không tồn tại.',
            testsdata: []
        });
    }
});

module.exports = router;