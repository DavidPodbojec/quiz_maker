// App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import QuestionList from './components/QuestionList';
import ThemeDeleted from './components/ThemeDeleted';

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [themeDeleted, setThemeDeleted] = useState(false);

  const handleThemeClick = (themeId) => {
    setSelectedTheme(themeId);
    setThemeDeleted(false); // Reset themeDeleted state when a new theme is selected
  };

  const handleThemeDeleted = () => {
    setThemeDeleted(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <Navbar handleThemeClick={handleThemeClick} handleThemeDeleted={handleThemeDeleted} />
        </div>
        <div className="col-9">
          {themeDeleted ? <ThemeDeleted /> : selectedTheme && <QuestionList selectedTheme={selectedTheme} />}
        </div>
      </div>
    </div>
  );
};

export default App;
