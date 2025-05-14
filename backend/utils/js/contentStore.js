let albums = [];
let tracks = [];

module.exports = {
  getAlbums: () => albums,
  getTracks: () => tracks,
  setAlbums: (data) => { albums = data; },
  setTracks: (data) => { tracks = data; }
};
