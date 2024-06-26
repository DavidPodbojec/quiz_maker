import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizPopup from './QuizPopup';

const QuestionList = ({ selectedTheme }) => {
  const [questions, setQuestions] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [showQuizPopup, setShowQuizPopup] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/themes/${selectedTheme}/questions`);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (selectedTheme) {
      fetchQuestions();
    }
  }, [selectedTheme]);

  const handleAddQuestion = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/themes/${selectedTheme}/questions`, {
        text: newQuestionText
      });
      const createdQuestion = response.data.question;
      setQuestions([createdQuestion, ...questions]);
      setNewQuestionText('');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await handleAddQuestion();
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://localhost:5000/api/questions/${questionId}`);
      const updatedQuestions = questions.filter(question => question._id !== questionId);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleQuizTime = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/quiz');
      const quizQuestions = response.data.questions;
      setShowQuizPopup(true);
      setQuizQuestions(quizQuestions); // Set quiz questions in the state
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    }
  };

  return (
    <div>
      <h3>Questions for Theme</h3>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter new question"
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-primary mt-2" onClick={handleAddQuestion}>Add Question</button>
      </div>
      <ul className="list-group">
        {questions.map(question => (
          <li key={question._id} className="list-group-item d-flex justify-content-between">
            {question.text}
            <button className="btn btn-danger" onClick={() => handleDeleteQuestion(question._id)}>X</button>
          </li>
        ))}
      </ul>
      <div>
        <button className="btn btn-primary mt-3" onClick={handleQuizTime}>Quiz Time</button>
      </div>
      {showQuizPopup && <QuizPopup quizQuestions={quizQuestions} onClose={() => setShowQuizPopup(false)} />}
    </div>
  );
};

export default QuestionList;
