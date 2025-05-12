const { client } = require('../contentful_connector/contentful');

async function fetchAndStoreContentfulData() {
    try {
        // Fetch and log Album data
        console.log("Fetching Albums from Contentful...");
        const albumEntries = await client.getEntries({ content_type: 'album' });
        console.log('Fetched Albums:', albumEntries.items);

        // Fetch and log track data
        console.log("Fetching Albums from Contentful...");
        const trackEntries = await client.getEntries({ content_type: 'track' });
        console.log('Fetched Albums:', trackEntries.items);

    } catch (err) {
        console.error('Error fetching data from Contentful:', err);
    }
}

module.exports = {
    fetchAndStoreContentfulData,
};
