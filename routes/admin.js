const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin_controller');

// Trang login (không cần layout)
router.get('/login', (req, res) => {
  res.render('admin/login', { layout: false });
});
router.post('/login', adminController.login);
router.get('/logout', adminController.logout);

// Các route yêu cầu đăng nhập, dùng layout admin
router.use(adminController.requireAdmin);

// Dashboard
router.get('/dashboard', (req, res) => {
  const stats = adminController.getDashboardStats();
  adminController.renderAdmin(req, res, 'dashboard', { stats });
});

// Documents
router.get('/documents', (req, res) => {
  const categories = adminController.getAllCategories();
  adminController.renderAdmin(req, res, 'documents', { categories });
});

// Logs
router.get('/logs', (req, res) => {
  const logs = adminController.getLogs();
  adminController.renderAdmin(req, res, 'logs', { logs });
});

router.post('/documents/add/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const testData = req.body;
  controller.addTest(categoryId, testData);
  res.redirect('/admin/documents');
});

router.post('/documents/update/:categoryId/:testIndex', (req, res) => {
  const { categoryId, testIndex } = req.params;
  controller.updateTest(categoryId, parseInt(testIndex), req.body);
  res.redirect('/admin/documents');
});

router.post('/documents/delete/:categoryId/:testIndex', (req, res) => {
  const { categoryId, testIndex } = req.params;
  controller.deleteTest(categoryId, parseInt(testIndex));
  res.redirect('/admin/documents');
});

// Access logs
router.get('/logs', (req, res) => {
  const logs = controller.getLogs();
  res.render('admin/logs', { logs });
});

module.exports = router;