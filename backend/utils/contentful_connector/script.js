const contentfulClient = require('./contentful');

async function getTrackEntries() {
    try {
        const data = await contentfulClient.client.getEntries();
        return data;
    } catch (err) {
        console.error('Error fetching entries from Contentful:', err);
        throw err;
    }
}

module.exports = {
    getTrackEntries
};
