const contentStore = require('../../utils/js/contentStore');

const getAllTracks = (req, res) => {
  const tracks = contentStore.getTracks();
  const albums = contentStore.getAlbums();

  // Group tracks by album
  const groupedTracks = albums.map(album => {
    // Find tracks related to the current album
    const albumTracks = tracks.filter(track => track.AlbumId === album.id);
    return {
      ...album,
      Tracks: albumTracks
    };
  });
 console.log("Grouped Tracks:", JSON.stringify(groupedTracks, null, 2))
  res.json(groupedTracks);
};

module.exports = { getAllTracks };
