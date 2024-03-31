const Theme = require('../models/Theme');


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


exports.updateTheme = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
  
      
      const updatedTheme = await Theme.findByIdAndUpdate(id, { name }, { new: true });
  
      if (!updatedTheme) {
        return res.status(404).json({ error: 'Theme not found' });
      }
  
      res.json({ message: 'Theme updated successfully', theme: updatedTheme });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update theme', details: error.message });
    }
  };
  

exports.deleteTheme = async (req, res) => {
    try {
      const { id } = req.params;
  
      
      const deletedTheme = await Theme.findByIdAndDelete(id);
  
      if (!deletedTheme) {
        return res.status(404).json({ error: 'Theme not found' });
      }
  
      res.json({ message: 'Theme deleted successfully', theme: deletedTheme });
    } catch (error) {
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
  