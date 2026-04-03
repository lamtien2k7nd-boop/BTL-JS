const { getAllCategories, addTest, updateTest, deleteTest } = require('../models/document_model');
const { getLogs, getTopDocuments } = require('../models/access_log');
const ejs = require('ejs');
const path = require('path');


// Thống kê dashboard
const getDashboardStats = () => {
  const archives = getAllCategories();
  const totalDocs = archives.reduce((sum, cat) => sum + cat.tests.length, 0);
  const categoryCounts = archives.map(cat => ({ id: cat.id, name: cat.title, count: cat.tests.length }));
  const pageViews = getLogs({ type: 'page_view' }).length;
  const topDocs = getTopDocuments(5);
  return { totalDocs, categoryCounts, pageViews, topDocs };
};

// Middleware kiểm tra đăng nhập
const requireAdmin = (req, res, next) => {
  if (req.session.adminLoggedIn) return next();
  res.redirect('/admin/login');
};

// Xử lý đăng nhập
const login = (req, res) => {
  const { password } = req.body;
  if (password === 'admin123') { // thay bằng mật khẩu thực tế
    req.session.adminLoggedIn = true;
    res.redirect('/admin/dashboard');
  } else {
    res.render('admin/login', { error: 'Sai mật khẩu' });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
};

// Dashboard
const dashboard = (req, res) => {
  const stats = getDashboardStats();
  res.render('admin/dashboard', { stats });
};

// Quản lý tài liệu
const documents = (req, res) => {
  const categories = getAllCategories();
  res.render('admin/documents', { categories });
};

// Thêm tài liệu
const addTestHandler = (req, res) => {
  const { categoryId } = req.params;
  addTest(categoryId, req.body);
  res.redirect('/admin/documents');
};

// Cập nhật tài liệu
const updateTestHandler = (req, res) => {
  const { categoryId, testIndex } = req.params;
  updateTest(categoryId, parseInt(testIndex), req.body);
  res.redirect('/admin/documents');
};

// Xoá tài liệu
const deleteTestHandler = (req, res) => {
  const { categoryId, testIndex } = req.params;
  deleteTest(categoryId, parseInt(testIndex));
  res.redirect('/admin/documents');
};

// Nhật ký truy cập
const logs = (req, res) => {
  const allLogs = getLogs();
  res.render('admin/logs', { logs: allLogs });
};

// Hàm render layout cho admin
const renderAdmin = (req, res, viewName, viewData = {}) => {
  const layoutPath = path.join(__dirname, '../views/admin/layout.ejs');
  const viewPath = path.join(__dirname, `../views/admin/${viewName}.ejs`);
  
  // Render nội dung view con trước
  ejs.renderFile(viewPath, viewData, (err, bodyContent) => {
    if (err) {
      console.error('Lỗi render view con:', err);
      return res.status(500).send('Lỗi hiển thị trang');
    }
    // Render layout và truyền bodyContent cùng dữ liệu
    res.render('admin/layout', { bodyContent, ...viewData });
  });
};

// Thêm vào cuối file:
module.exports = {
  requireAdmin,
  login,
  logout,
  renderAdmin,
  dashboard,
  documents,
  addTest: addTestHandler,
  updateTest: updateTestHandler,
  deleteTest: deleteTestHandler,
  logs,
  getDashboardStats,   // thêm
  getAllCategories,    // thêm
  getLogs              // thêm
};