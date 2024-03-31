import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Navbar = () => {
    // State to store the fetched themes
    const [themes, setThemes] = useState([]);
  
    // Function to fetch themes from the backend
    const fetchThemes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/themes/all');
        // Set the fetched themes in state
        setThemes(response.data.themes);
      } catch (error) {
        console.error('Error fetching themes:', error);
      }
    };
  
    // Fetch themes when the component mounts
    useEffect(() => {
      fetchThemes();
    }, []);
  
    return (
      <div className="side-navbar">
        <h2>Themes</h2>
        <ul>
          {/* Map through themes array and display theme names */}
          {themes.map(theme => (
            <li key={theme._id}>{theme.name}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Navbar;
