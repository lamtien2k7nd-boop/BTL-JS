const fs = require('fs');
const path = require('path');
const LOG_FILE = path.join(__dirname, '../data/access_logs.json');

// Đảm bảo file log tồn tại
if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, JSON.stringify([]));
}

// Ghi log
const logAccess = (entry) => {
  const logs = JSON.parse(fs.readFileSync(LOG_FILE));
  logs.push({ ...entry, timestamp: new Date().toISOString() });
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
};

// Lấy logs theo filter
const getLogs = (filter = {}) => {
  const logs = JSON.parse(fs.readFileSync(LOG_FILE));
  if (filter.type) return logs.filter(l => l.type === filter.type);
  return logs;
};

// Lấy top tài liệu được truy cập nhiều nhất
const getTopDocuments = (limit = 10) => {
  const logs = getLogs({ type: 'document_access' });
  const docCount = {};
  logs.forEach(log => {
    const key = `${log.categoryId}|${log.testName}`;
    docCount[key] = (docCount[key] || 0) + 1;
  });
  return Object.entries(docCount)
    .map(([key, count]) => {
      const [categoryId, testName] = key.split('|');
      return { categoryId, testName, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

module.exports = { logAccess, getLogs, getTopDocuments };