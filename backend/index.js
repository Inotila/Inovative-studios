const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bagRoutes = require('./routes/bagRoutes');
const albumRoutes = require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes');
const { fetchAndStoreContentfulData } = require('./utils/js/script');

const app = express();
const port = 3001;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/bags', bagRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/tracks', trackRoutes);

// Fetch and store Contentful data on startup
fetchAndStoreContentfulData()
  .then(() => console.log('Contentful data fetched and stored'))
  .catch(err => console.error('Error fetching Contentful data:', err));

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});

module.exports = app;
