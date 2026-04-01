const express = require('express');
const app = express();
const path = require('path');

// set view engine là ejs
app.set('view engine', 'ejs');

// set thư mục chứa file .ejs
app.set('views', './views');

// // route test
// app.get('/', (req, res) => {
//     res.render('trangchu', { name: 'Tiến' });
// });
// route home
const homeRouter = require('./routes/home');
app.use('/', homeRouter);

// route archives
const archivesRouter = require('./routes/archives');
app.use('/archives', archivesRouter);

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server chạy ở http://localhost:3000');
});