const express = require('express');

const router = express.Router();
const categoryController = require('../controller/categoryController');

router.post('/AddCategory',categoryController.createCategory);
router.get('/getCategories',categoryController.getCategory);
router.get('/getCategoryById/:id',categoryController.getCategoryById);
router.put('/updateCategoryById/:id',categoryController.updateCategory);
router.delete('/deleteCategoryById/:id',categoryController.deleteCategory);
module.exports = router;
