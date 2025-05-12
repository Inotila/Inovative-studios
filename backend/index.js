const express = require('express');
const cors = require('cors'); // Import cors

const { fetchAndStoreContentfulData } = require('./utils/js/contentfulService');

const app = express();
const port = 3001;

// Use CORS middleware
app.use(cors());  // This allows all origins, including http://localhost:3000

app.use(express.json());

// Registering routes


// Fetch and store Contentful data on startup
fetchAndStoreContentfulData()
  .then(() => console.log('Contentful data fetched and stored'))
  .catch(err => console.error('Error fetching Contentful data:', err));

// Root route
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Start server
app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});

module.exports = app;
