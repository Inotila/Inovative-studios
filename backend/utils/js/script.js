const { client } = require('../contentful_connector/contentful');
const { Album, Track } = require('../../models')

// Function to fetch and store albums and tracks
async function fetchAndStoreContentfulData() {
    try {
        const albumEntries = await client.getEntries({ content_type: 'album' });
        for (const entry of albumEntries.items) {
            const albumData = entry.fields;
            await Album.upsert({
                Album_ID: entry.sys.id,
                Title: albumData.title,
                Download_count: albumData.download_count || 0, // Handle missing fields
                Like_count: albumData.like_count || 0,
                // Add other fields from Contentful 
            });

            for (const trackLink of albumData.tracks || []) {
                const trackEntry = await client.getEntry(trackLink.sys.id);
                const trackData = trackEntry.fields;
                await Track.upsert({
                    Track_ID: trackEntry.sys.id,
                    Title: trackData.title,
                    Album_ID: entry.sys.id,
                    Play_count: trackData.play_count || 0,
                    Download_count: trackData.download_count || 0,
                    Like_count: trackData.like_count || 0,
                    // Add other fields from Contentful 
                });
            }
        }
    } catch (err) {
        console.error('Error fetching and storing data from Contentful:', err);
        throw err;
    }
}

module.exports = {
    fetchAndStoreContentfulData
};
