const express = require('express');
const userRoutes = require('./routes/user_routes/userRoutes');
const bagRoutes = require('./routes/user_routes/bagRoutes');
const albumRoutes = require('./routes/music_routes/albumRoutes');
const videoRoutes = require('./routes/video_routes/videoRoutes');
const seriesRoutes = require('./routes/video_routes/seriesRoutes');
const trackRoutes = require('./routes/music_routes/trackRoutes');
const projectRoutes = require('./routes/project_routes/projectRoutes');
const serviceRoutes = require('./routes/service_routes/serviceRoutes'); 
const { fetchAndStoreContentfulData } = require('./utils/js/script');

const app = express();
const port = 3001;

app.use(express.json());

// Registering routes
app.use('/api/users', userRoutes);
app.use('/api/bags', bagRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes); 

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
