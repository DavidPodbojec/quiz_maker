const Question = require('../models/Question');

exports.createQuestion = async (req, res) => {
  try {
    const { themeId } = req.params;
    const { text } = req.body;

    const newQuestion = new Question({
      theme: themeId,
      text
    });

    await newQuestion.save();

    res.status(201).json({ message: 'Question created successfully', question: newQuestion });
  } catch (error) {

    res.status(500).json({ error: 'Failed to create question', details: error.message });
  }
};

exports.getAllQuestionsForTheme = async (req, res) => {
  try {
    const { themeId } = req.params;

    const questions = await Question.find({ theme: themeId });

    res.json({ questions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve questions', details: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { text } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(questionId, { text }, { new: true });

    if (!updatedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json({ message: 'Question updated successfully', question: updatedQuestion });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update question', details: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    const deletedQuestion = await Question.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json({ message: 'Question deleted successfully', question: deletedQuestion });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete question', details: error.message });
  }
};
