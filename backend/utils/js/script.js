const { client } = require('../contentful_connector/contentful');
const { Album, Track, Series, Video } = require('../../models');

async function fetchAndStoreContentfulData() {
    try {
        // Fetch and store Album and Track data
        console.log("Fetching Albums from Contentful...");
        const albumEntries = await client.getEntries({ content_type: 'album' });
        for (const entry of albumEntries.items) {
            const albumData = entry.fields;
            await Album.upsert({
                Album_ID: entry.sys.id,
                Title: albumData.title,
                Download_count: albumData.download_count || 0,
                Like_count: albumData.like_count || 0,
            });
            console.log(`Stored Album: ${albumData.title}`);

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
                });
                console.log(`Stored Track: ${trackData.title} in Album: ${albumData.title}`);
            }
        }

        // Fetch and store Series data
        console.log("Fetching Series from Contentful...");
        const seriesEntries = await client.getEntries({ content_type: 'series' });
        for (const entry of seriesEntries.items) {
            const seriesData = entry.fields;
            await Series.upsert({
                Series_ID: entry.sys.id,
                Like_count: seriesData.like_count || 0,
                Download_count: seriesData.download_count || 0,
            });
            console.log(`Stored Series: ${seriesData.title || 'Untitled Series'}`);

            // Log the seriesData object to debug
            console.log('Series Data:', seriesData);

            // Check if seriesData.videos is an array
            if (Array.isArray(seriesData.videos)) {
                console.log('Found Videos:', seriesData.videos);

                for (const videoLink of seriesData.videos) {
                    const videoEntry = await client.getEntry(videoLink.sys.id);
                    const videoData = videoEntry.fields;

                    console.log(`Fetching Video: ${videoEntry.sys.id}`);
                    
                    await Video.upsert({
                        Video_ID: videoEntry.sys.id,
                        Series_ID: entry.sys.id,
                        Title: videoData.title,
                        Video: videoData.video, 
                        Thumbnail_cover_art: videoData.thumbnailCoverArt,
                        Release_date: videoData.releaseDate,
                        Genre: videoData.genre,
                        Price: videoData.price || 0,
                        Director: videoData.director,
                        Executive_producer: videoData.executiveProducer,
                        Owner_of_video_rights: videoData.ownerOfVideoRights,
                    });
                    console.log(`Stored Video: ${videoData.title} in Series: ${seriesData.title || 'Untitled Series'}`);
                }
            } else {
                console.log(`No videos found for Series: ${seriesData.title || 'Untitled Series'}`);
            }
        }

    } catch (err) {
        console.error('Error fetching and storing data from Contentful:', err);
        throw err;
    }
}

module.exports = {
    fetchAndStoreContentfulData,
};
