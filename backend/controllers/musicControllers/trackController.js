const contentStore = require('../../utils/js/contentStore');

const getAllTracks = (req, res) => {
  const tracks = contentStore.getTracks();
  const albums = contentStore.getAlbums();


  const groupedTracks = albums.map(album => {

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
