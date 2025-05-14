const express = require('express');
const cors = require('cors'); 
const { fetchAndStoreContentfulData } = require('./utils/js/contentfulService');
const contentStore = require('./utils/js/contentStore');
const albumController = require('./controllers/musicControllers/albumController' );
const albumRoutes = require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes'); 

const app = express();
const port = 3001;

// Use CORS middleware
app.use(cors()); 

// Parse incoming JSON requests
app.use(express.json());

// API Routes
app.use('/api/albums', albumRoutes); 
app.use('/api/tracks', trackRoutes);

// Fetch and store Contentful data on startup
fetchAndStoreContentfulData() 
 .then(({ albums, tracks }) => {
    contentStore.setAlbums(albums);
    contentStore.setTracks(tracks);
    console.log('Contentful data fetched and stored');
  })
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
