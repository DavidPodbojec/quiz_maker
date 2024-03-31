const express = require('express');
const connection = require('./database'); // Import the database connection
const themeRouter = require('./routes/themeRouter');

const app = express();

app.use(express.json());

// No need to connect to MongoDB here, as it's already done in database.js

app.use('/api/themes', themeRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
