const fs = require('fs'); 
const path = require('path'); 
const p = path.join(__dirname, 'data', 'archives.json'); 
let d = JSON.parse(fs.readFileSync(p, 'utf8')); 
d.forEach(cat => { 
    cat.tests = []; 
    for(let i = 1; i <= 24; i++) { 
        let catTitle = cat.title ? cat.title.replace('category archives: ', '') : '';
        cat.tests.push({ 
            image: "https://tailieuonthi.org/wp-content/uploads/2026/01/15-696213d9e9756-768x384.webp", 
            dateDay: "1" + (i % 9), 
            dateMonth: "Jan", 
            name: `Đề Đánh giá năng lực ${catTitle.toUpperCase()} - Toán học số ${i}`, 
            excerpt: `Đề đánh giá năng lực ${catTitle} Toán học số ${i} là tài liệu luyện tập cực kì bám sát HTML [...].` 
        }); 
    } 
}); 
fs.writeFileSync(p, JSON.stringify(d, null, 2), 'utf8'); 
console.log('Fixed archives.json with 24 items per category');
