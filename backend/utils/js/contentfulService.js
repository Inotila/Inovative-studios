const { client } = require('../contentful_connector/contentful');

async function fetchAndStoreContentfulData() {
    try {
        // Fetch Albums from Contentful
        console.log("Fetching Albums from Contentful...");
        const albumEntries = await client.getEntries({ content_type: 'album' });

        if (albumEntries.items.length === 0) {
            console.log("No albums found in Contentful.");
            return;
        }

        // Log each album's data
        albumEntries.items.forEach(albumEntry => {
            console.log(`Album: ${albumEntry.fields.title}`);
            if (albumEntry.fields.tracks) {
                albumEntry.fields.tracks.forEach(track => {
                    console.log(`  Track: ${track.fields.title} | URL: ${track.fields.trackUrl}`);
                });
            }
        });

        console.log("Fetching tracks from Contentful...");
        const trackEntries = await client.getEntries({ content_type: 'track' });

        if (trackEntries.items.length === 0) {
            console.log("No tracks found in Contentful.");
            return;
        }

        // Log each track's data
        trackEntries.items.forEach(trackEntry => {
            console.log(`Track: ${trackEntry.fields.title} | URL: ${trackEntry.fields.trackUrl}`);
        });

        console.log("Contentful data fetched successfully.");
    } catch (err) {
        console.error('Error fetching data from Contentful:', err);
        throw err;
    }
}

module.exports = {
    fetchAndStoreContentfulData,
};
