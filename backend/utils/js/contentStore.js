let albums = [];
let tracks = [];
let services = [];
let projects = [];

module.exports = {
  getAlbums: () => albums,
  getTracks: () => tracks,
  getServices: () => services,
  setAlbums: (data) => { albums = data; },
  setTracks: (data) => { tracks = data; },
  setServices: (data) => { services = data; },
  setProjects: (data) => { projects = data; }
};
