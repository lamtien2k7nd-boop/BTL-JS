const express = require('express');
const app = express();

// set view engine là ejs
app.set('view engine', 'ejs');

// set thư mục chứa file .ejs
app.set('views', './views');

// route test
app.get('/', (req, res) => {
    res.render('trangchu', { name: 'Tiến' });
});

app.listen(3000, () => {
    console.log('Server chạy ở http://localhost:3000');
});