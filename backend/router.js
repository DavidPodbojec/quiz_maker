const express = require('express');
const router = express.Router();
const themeController = require('./controllers/themeController');
const questionController = require('./controllers/questionController');

// Themes Endpoints
router.post('/themes', themeController.createTheme);
router.get('/themes/all', themeController.getAllThemes);
router.delete('/themes/:id', themeController.deleteTheme);

// Questions Endpoints
router.post('/themes/:themeId/questions', questionController.createQuestion);
router.get('/themes/:themeId/questions', questionController.getAllQuestionsForTheme);
router.delete('/questions/:questionId', questionController.deleteQuestion);

router.get('/quiz', async (req, res) => {
    try {
      // Get all questions
      const allQuestions = await questionController.getAllQuestions();
  
      // Shuffle the questions array to get random selection
      const shuffledQuestions = shuffleArray(allQuestions);
  
      // Limit to at most 20 questions
      const selectedQuestions = shuffledQuestions.slice(0, Math.min(20, shuffledQuestions.length));
  
      res.json({ questions: selectedQuestions });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quiz questions', details: error.message });
    }
  });
  
  // Function to shuffle array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  

module.exports = router;
