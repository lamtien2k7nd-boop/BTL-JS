const fs = require('fs');
const path = require('path');
const ARCHIVES_FILE = path.join(__dirname, '../data/archives.json'); 

const readArchives = () => JSON.parse(fs.readFileSync(ARCHIVES_FILE));
const writeArchives = (data) => fs.writeFileSync(ARCHIVES_FILE, JSON.stringify(data, null, 2));

const getAllCategories = () => readArchives();

const getCategoryById = (id) => readArchives().find(cat => cat.id === id);

const addTest = (categoryId, testData) => {
  const archives = readArchives();
  const category = archives.find(c => c.id === categoryId);
  if (!category) throw new Error('Category not found');
  category.tests.push(testData);
  writeArchives(archives);
};

const updateTest = (categoryId, testIndex, testData) => {
  const archives = readArchives();
  const category = archives.find(c => c.id === categoryId);
  if (!category || !category.tests[testIndex]) throw new Error('Test not found');
  category.tests[testIndex] = { ...category.tests[testIndex], ...testData };
  writeArchives(archives);
};

const deleteTest = (categoryId, testIndex) => {
  const archives = readArchives();
  const category = archives.find(c => c.id === categoryId);
  if (!category) throw new Error('Category not found');
  category.tests.splice(testIndex, 1);
  writeArchives(archives);
};

module.exports = { getAllCategories, getCategoryById, addTest, updateTest, deleteTest };