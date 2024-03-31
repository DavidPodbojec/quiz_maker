const express = require('express');
const router = express.Router();
const themeController = require('../controllers/themeController');

// DELETE request to delete an existing theme
router.delete('/:id', themeController.deleteTheme);
// GET request to retrieve all themes
router.get('/all', themeController.getAllThemes);

router.put('/:id', themeController.updateTheme);

router.post('/', themeController.createTheme);

module.exports = router;
