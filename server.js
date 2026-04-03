const express = require('express');
const session = require('express-session');
// const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

// Middleware parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session (quan trọng cho admin auth)
app.use(session({
  secret: 'your-secret-key-change-this',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // true nếu dùng https
}));

// Static files
app.use(express.static('public'));

// View engine setup với express-ejs-layouts
// app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', './views');
// app.set('layout', false);

// Middleware ghi log truy cập (cho tất cả các trang không phải admin)
const { logAccess } = require('./models/access_log');
app.use((req, res, next) => {
  if (!req.path.startsWith('/admin') && req.path !== '/admin/login') {
    logAccess({
      type: 'page_view',
      path: req.path,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
  }
  next();
});

// Routes
const homeRouter = require('./routes/home');
const archivesRouter = require('./routes/archives');
const adminRoutes = require('./routes/admin');

app.use('/', homeRouter);
app.use('/archives', archivesRouter);
app.use('/admin', adminRoutes);

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server chạy ở http://localhost:${PORT}`);
});