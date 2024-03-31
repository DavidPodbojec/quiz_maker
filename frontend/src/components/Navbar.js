// Navbar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Navbar = ({ handleThemeClick }) => {
  const [themes, setThemes] = useState([]);
  const [newThemeName, setNewThemeName] = useState('');

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/themes/all');
        setThemes(response.data.themes);
      } catch (error) {
        console.error('Error fetching themes:', error);
      }
    };

    fetchThemes();
  }, []);

  const handleCreateTheme = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/themes', { name: newThemeName });
      const createdTheme = response.data.theme;
      setThemes([...themes, createdTheme]);
      setNewThemeName('');
    } catch (error) {
      console.error('Error creating theme:', error);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await handleCreateTheme();
    }
  };

  const handleDeleteTheme = async (themeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/themes/${themeId}`);
      setThemes(themes.filter(theme => theme._id !== themeId));
    } catch (error) {
      console.error('Error deleting theme:', error);
    }
  };

  return (
    <div className="bg-dark text-light p-4 position-fixed start-0 top-0 bottom-0" style={{ width: '250px', overflowY: 'auto' }}>
      <h2 className="text-center mb-3">Themes</h2>
      <div className="input-group mb-3" style={{ top: '0', position: 'sticky', zIndex: '1', backgroundColor: '#343a40', paddingTop: '10px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="New Theme"
          value={newThemeName}
          onChange={(e) => setNewThemeName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="btn btn-primary ms-2"
          type="button"
          onClick={handleCreateTheme}
        >
          Add
        </button>
      </div>
      <div className="list-group mb-3" style={{ maxHeight: 'calc(100vh - 200px)', marginTop: '50px' }}>
        {themes.map(theme => (
          <div key={theme._id} className="d-flex justify-content-between align-items-center">
            <button
              className="list-group-item list-group-item-action border-0 bg-dark text-light"
              onClick={() => handleThemeClick(theme._id)}
            >
              {theme.name}
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteTheme(theme._id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
