const { client } = require('../contentful_connector/contentful');

// Fetch albums from Contentful
const fetchAndStoreContentfulData = async () => {
  try {
    console.log("Fetching Albums from Contentful...");

    // Fetch album entries from Contentful
    const albumEntries = await client.getEntries({ content_type: 'album' });

    if (albumEntries.items.length === 0) {
      console.log("No albums found in Contentful.");
      return;
    }

    // Map the album entries to a simpler structure
    const albums = albumEntries.items.map((item) => {
      const albumFields = item.fields;
      const albumCoverArtUrl = albumFields.albumCoverArt && albumFields.albumCoverArt.fields.file.url;
      return {
        Title: albumFields.title,
        AlbumCoverArt: albumCoverArtUrl,
      };
    });

    console.log("Fetched albums from Contentful:", albums);
    
  } catch (err) {
    console.error('Error fetching albums from Contentful:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { fetchAndStoreContentfulData };
