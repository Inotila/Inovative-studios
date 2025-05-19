let albums = [];
let tracks = [];
let services = [];
let projects = [];

module.exports = {
  getAlbums: () => albums,
  getTracks: () => tracks,
  getServices: () => services,
  getProjects: () => projects,
  setAlbums: (data) => { albums = data; },
  setTracks: (data) => { tracks = data; },
  setServices: (data) => { services = data; },
  setProjects: (data) => { projects = data; }
};
