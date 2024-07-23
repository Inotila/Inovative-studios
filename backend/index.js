const express = require('express');
const { getTrackEntries } = require('./utils/contentful_connector/script');

const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.get('/tracks', async (req, res) => {
    try {
        const data = await getTrackEntries();
        res.json(data);
    } catch (err) {
        console.error('Error in /tracks endpoint:', err);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});
