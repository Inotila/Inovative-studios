let albums = [];
let tracks = [];
let services = [];

module.exports = {
  getAlbums: () => albums,
  getTracks: () => tracks,
  getServices: () => services,
  setAlbums: (data) => { albums = data; },
  setTracks: (data) => { tracks = data; },
  setServices: (data) => { services = data; }
};
