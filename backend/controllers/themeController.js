const Theme = require('../models/Theme');
const Question = require('../models/Question');


exports.createTheme = async (req, res) => {
  try {
    
    const { name } = req.body;

    
    const newTheme = new Theme({
      name      
    });

    await newTheme.save();

    res.status(201).json({ message: 'Theme created successfully', theme: newTheme });
  } catch (error) {
    
    res.status(500).json({ error: 'Failed to create theme', details: error.message });
  }
};


  exports.deleteTheme = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the theme by ID
        const theme = await Theme.findById(id);

        if (!theme) {
            return res.status(404).json({ error: 'Theme not found' });
        }

        // Find all questions associated with the theme
        const questions = await Question.find({ theme: id });
        
        // Delete all questions associated with the theme
        const deletionResult = await Question.deleteMany({ theme: id });
        

        // Delete the theme
        const deletedTheme = await Theme.findByIdAndDelete(id);

        res.json({ message: 'Theme deleted successfully', theme: deletedTheme, deletedQuestions: questions });
    } catch (error) {
        console.error('Error deleting theme:', error);
        res.status(500).json({ error: 'Failed to delete theme', details: error.message });
    }
};






exports.getAllThemes = async (req, res) => {
    try {
      
      const themes = await Theme.find();
  
      res.json({ themes });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve themes', details: error.message });
    }
  };
  