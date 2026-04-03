const { logAccess } = require('../models/access_log');

// Khi người dùng xem một đề cụ thể
router.get('/test/:categoryId/:testId', (req, res) => {
  // ... lấy thông tin test
  logAccess({
    type: 'document_access',
    categoryId: req.params.categoryId,
    testName: test.name,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  // ... render trang
});