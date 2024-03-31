// App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import QuestionList from './components/QuestionList';
import ThemeDeleted from './components/ThemeDeleted'; // Import ThemeDeleted component

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [themeDeleted, setThemeDeleted] = useState(false); // State to track if theme is deleted

  const handleThemeClick = (themeId) => {
    setSelectedTheme(themeId);
    setThemeDeleted(false); // Reset themeDeleted state when a theme is clicked
  };

  const handleDeleteTheme = () => {
    setSelectedTheme(null); // Reset selectedTheme when theme is deleted
    setThemeDeleted(true); // Set themeDeleted state to true
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <Navbar handleThemeClick={handleThemeClick} handleDeleteTheme={handleDeleteTheme} />
        </div>
        <div className="col-9">
          {themeDeleted ? <ThemeDeleted /> : (selectedTheme && <QuestionList selectedTheme={selectedTheme} />)}
        </div>
      </div>
    </div>
  );
};

export default App;
