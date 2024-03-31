const express = require('express');
const router = express.Router();
const themeController = require('./controllers/themeController');
const questionController = require('./controllers/questionController');

// Themes Endpoints
router.post('/themes', themeController.createTheme);
router.get('/themes/all', themeController.getAllThemes);
router.put('/themes/:id', themeController.updateTheme); 
router.delete('/themes/:id', themeController.deleteTheme);

// Questions Endpoints
router.post('/themes/:themeId/questions', questionController.createQuestion);
router.get('/themes/:themeId/questions', questionController.getAllQuestionsForTheme);
router.put('/questions/:questionId', questionController.updateQuestion);
router.delete('/questions/:questionId', questionController.deleteQuestion);

module.exports = router;
