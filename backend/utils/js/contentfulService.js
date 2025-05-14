const { client } = require('../contentful_connector/contentful');

// Fetch albums and tracks from Contentful
const fetchAndStoreContentfulData = async () => {
  try {
    console.log("Fetching Albums and Tracks from Contentful...");

    // 1. Fetch all albums
    const albumEntries = await client.getEntries({ content_type: 'album' });
    console.log("Album Entries:", albumEntries.items.length); 
    const albumsMap = {};

    const albums = albumEntries.items.map((item) => {
      const fields = item.fields;
      const id = item.sys.id;
      const albumCoverArtUrl = fields.albumCoverArt?.fields?.file?.url;

      const albumData = {
        id,
        Title: fields.title,
        Artist: fields.artist,
        Price: fields.price,
        ReleaseDate: fields.releaseDate,
        Genre: fields.genre,
        ExecutiveProducer: fields.executiveProducer,
        OwnerOfAlbumRights: fields.ownerOfAlbumRights,
        AlbumCoverArt: albumCoverArtUrl,
        Tracks: []
      };

      albumsMap[id] = albumData;
      return albumData;
    });

    // 2. Fetch all tracks
    const trackEntries = await client.getEntries({ content_type: 'track' });
    console.log("Track Entries:", trackEntries.items.length);

    const tracks = trackEntries.items.map((item) => {
      const fields = item.fields;

      const musicFileUrl = fields.musicFile?.fields?.file?.url;
      const coverArtUrl = fields.trackCoverArt?.fields?.file?.url;
      const albumRefId = fields.album?.sys?.id;

      const trackData = {
        Title: fields.title,
        TrackNumber: fields.trackNumber,
        TrackArtist: fields.trackArtist,
        FeaturedArtists: fields.featuredArtists || [],
        Producer: fields.producer,
        MixAndMasteredBy: fields.mixAndMasteredBy,
        Genre: fields.genre,
        Price: fields.price,
        OwnerOfTrackRights: fields.ownerOfTrackRights,
        ReleaseDate: fields.releaseDate,
        MusicFile: musicFileUrl,
        TrackCoverArt: coverArtUrl,
        AlbumId: albumRefId
      };

      // Associate with album if applicable
      if (albumRefId && albumsMap[albumRefId]) {
        albumsMap[albumRefId].Tracks.push(trackData);
      }

      return trackData;
    });

    console.log(`Fetched ${albums.length} albums and ${tracks.length} tracks`);

    return { albums, tracks }; // both flat and grouped by album
  } catch (err) {
    console.error('Error fetching albums/tracks from Contentful:', err);
    throw err;
  }
};

module.exports = { fetchAndStoreContentfulData };
