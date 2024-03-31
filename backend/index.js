const express = require('express');
const cors = require('cors'); // Import cors module
const connection = require('./database'); 
const themeRouter = require('./router');

const app = express();

app.use(express.json());
app.use(cors()); // Use cors middleware to allow cross-origin requests

app.use('/api', themeRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
