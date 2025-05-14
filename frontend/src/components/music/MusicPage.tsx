import React, { useEffect, useState, } from 'react';
import { Link } from 'react-router-dom';
import './assets/css/musicPage.css';
import uncool from '../assets/images/entertianment/Front-cover-art.jpg';
import { fetchAlbums } from '../../services/contentfulService';

interface Album {
  Title: string;
  Artist: string;
  AlbumCoverArt: string;
  Price: number;
  ReleaseDate: string;
  Genre: string;
  ExecutiveProducer: string;
  OwnerOfAlbumRights: string;
}

const MusicPage: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const albums = await fetchAlbums();
        console.log('Fetched albums:', albums);
        setAlbums(albums);
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }
    };

    loadAlbums();
  }, []);
  return (
    <div className="container-fluid text-center">
      {/* Banner */}
      <div className="row justify-content-center my-3">
        <div className="out-now-banner-container shadow-container mx-3">
          <div className="out-now-banner-img-div align-self-start">
            <img id="outnow-img" src={uncool} alt="" />
          </div>
          <div className="out-now-banner-text-div">
            <h1 className="out-now-text">Uncool - Robot-KiD Out now!</h1>
          </div>
        </div>
      </div>

      {/* Albums */}
      <div className="row justify-content-center mt-3">
        <div className="music-selection-container shadow-container">
          <div className="track-album-playlist-container my-3">
            <button className="btn">Albums</button>
            <button className="btn mx-3">Tracks</button>
            <button className="btn">Playlist</button>
          </div>
          <div className="album-cards-row d-flex flex-row flex-wrap justify-content-center">
            {albums.map((album, index) => (
              <div className="album-card-container mx-2 mb-4" key={index}>
                <Link
                  to={`/music/${encodeURIComponent(album.Title.toLowerCase().replace(/\s+/g, '-'))}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="card shadow-container album-card flex-column">
                    <img
                      src={album.AlbumCoverArt || uncool}
                      alt={album.Title}
                      className="card-img-top music-cover"
                    />
                    <div className="card-body music-card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title">{album.Title}</h5>
                      <p className="card-text">{album.Artist}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Music Player */}
      <div className="row justify-content-center align-items-center">
        <div className="col-auto music-player-col d-flex justify-content-center align-items-center " >
          <div className="custom-music-player shadow-container d-flex ">

            {/* Cover Art */}
            <div className="album-art-container text-center me-auto">
              <img
                src={
                  uncool
                }
                alt={'Placeholder'}
                className="music-player-cover-art"
              />
            </div>

            {/* Timeline & Controls */}
            <div className='controls-wrapper d-flex flex-column align-items-center justify-content-center flex-grow-1'>
              <div className="music-timeline">
                <p>00:00 / 03:45</p>
              </div>
              <div className="music-controls">
                <button className="btn btn-secondary">
                  <i className="fa-solid fa-backward"></i>
                </button>
                <button className="btn btn-primary mx-2" >
                  <i className={'fas fa-pause'}></i>
                </button>
                <button className="btn btn-secondary" >
                  <i className="fa-solid fa-forward"></i>
                </button>
              </div>
            </div>

            {/* Extra Actions */}
            <div className="d-flex flex-column align-items-center">
              <button className="btn btn-secondary mb-2" >
                <i className="fa-regular fa-share-from-square"></i>
              </button>
              <button className="btn btn-secondary mb-2">
                <i className="fa-solid fa-shuffle"></i>
              </button>
              <button className="btn btn-secondary">
                <i className="fa-regular fa-heart"></i>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
