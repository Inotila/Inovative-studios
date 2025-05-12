import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './assets/css/musicPage.css';
import uncool from '../assets/images/entertianment/Front-cover-art.jpg';

interface Album {
  Album_ID: string;
  Title: string;
  Album_cover_art: string | null;
}

const MusicPage: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [currentSong, setCurrentSong] = useState<Album | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/albums');
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleSkipForward = () => console.log('Skip forward');
  const handleSkipBack = () => console.log('Skip back');
  const handleShuffle = () => console.log('Shuffle');
  const handleShare = () => console.log('Share');
  const handleLike = () => console.log('Like');

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
            {albums.map((album) => {
              const coverImageUrl = album.Album_cover_art;
              const fullImageUrl =
                coverImageUrl && coverImageUrl.startsWith('//')
                  ? 'https:' + coverImageUrl
                  : coverImageUrl;

              return (
                <div key={album.Album_ID} className="album-card-container mx-2 mb-4">
                  <div className="card shadow-container album-card flex-column">
                    <img
                      src={fullImageUrl || 'https://via.placeholder.com/150'}
                      alt={album.Title}
                      className="card-img-top music-cover"
                    />
                    <div className="card-body music-card-body align-self-end">
                      <h5 className="card-title">{album.Title}</h5>
                      <button className="btn" onClick={() => setCurrentSong(album)}>
                        Play
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
                  currentSong?.Album_cover_art
                    ? (currentSong.Album_cover_art.startsWith('//')
                      ? 'https:' + currentSong.Album_cover_art
                      : currentSong.Album_cover_art)
                    : 'https://via.placeholder.com/150'
                }
                alt={currentSong?.Title || 'Placeholder'}
                className="music-player-cover-art"
              />
            </div>

            {/* Timeline & Controls */}
            <div className='controls-wrapper d-flex flex-column align-items-center justify-content-center flex-grow-1'>
              <div className="music-timeline">
                <p>00:00 / 03:45</p>
              </div>
              <div className="music-controls">
                <button className="btn btn-secondary" onClick={handleSkipBack}>
                  <i className="fa-solid fa-backward"></i>
                </button>
                <button className="btn btn-primary mx-2" onClick={handlePlayPause}>
                  <i className={isPlaying ? 'fas fa-pause' : 'fas fa-play'}></i>
                </button>
                <button className="btn btn-secondary" onClick={handleSkipForward}>
                  <i className="fa-solid fa-forward"></i>
                </button>
              </div>
            </div>

            {/* Extra Actions */}
            <div className="d-flex flex-column align-items-center">
              <button className="btn btn-secondary mb-2" onClick={handleShare}>
                <i className="fa-regular fa-share-from-square"></i>
              </button>
              <button className="btn btn-secondary mb-2" onClick={handleShuffle}>
                <i className="fa-solid fa-shuffle"></i>
              </button>
              <button className="btn btn-secondary" onClick={handleLike}>
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
