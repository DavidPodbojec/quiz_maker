import React from 'react';

const QuizPopup = ({ quizQuestions, onClose }) => {
  return (
    <div className="bg-light p-4 position-fixed start-0 top-0 bottom-0 end-0 d-flex justify-content-center align-items-center" style={{ zIndex: '1000', overflowY: 'auto' }}>
      <div style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-3" style={{ fontSize: '28px' }}>Quiz Time</h2>
        <ol style={{ fontSize: '20px' }}>
          {quizQuestions.map((question, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>{question.text}</li>
          ))}
        </ol>
        <button className="btn btn-primary mt-3" style={{ fontSize: '20px' }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default QuizPopup;
