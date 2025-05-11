import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './assets/css/musicPage.css';

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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkipForward = () => {
    console.log('Skip forward');
  };

  const handleSkipBack = () => {
    console.log('Skip back');
  };

  const handleShuffle = () => {
    console.log('Shuffle');
  };

  const handleShare = () => {
    console.log('Share');
  };

  const handleLike = () => {
    console.log('Like');
  };

  return (
    <div className="container text-center">
      {/* Row 1: Header */}
      <div className="row">
        <div className="col">
          <h1 className="music-header">Music Player</h1>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h1 className="music-banner">Out now!</h1>
        </div>
      </div>

      <div className="row music-buttons">
        <div className="col">
          <button className="home-link-button">Albums</button>
        </div>
        <div className="col">
          <button className="home-link-button">Tracks</button>
        </div>
        <div className="col">
          <button className="home-link-button">Playlist</button>
        </div>
      </div>

      {/* Row 2: Album Cards */}
      <div className="row music-selection-container mt-3">
        {albums.map((album) => {
          const coverImageUrl = album.Album_cover_art;
          const fullImageUrl =
            coverImageUrl && coverImageUrl.startsWith('//')
              ? 'https:' + coverImageUrl
              : coverImageUrl;

          return (
            <div key={album.Album_ID} className="col-md-4 mb-4">
              <div className="card album-card">
                <img
                  src={fullImageUrl || 'https://via.placeholder.com/150'}
                  alt={album.Title}
                  className="card-img-top album-cover"
                />
                <div className="card-body">
                  <h5 className="card-title">{album.Title}</h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => setCurrentSong(album)}
                  >
                    Play
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Custom Music Player */}
      <div className="custom-music-player mt-3">
        <div className="row align-items-center">
          <div className="col-3 text-center">
            {/* Cover Art */}
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
          <div className="col-7">
            {/* Music Controls */}
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
          <div className="col-2 d-flex flex-column align-items-center">
            {/* Share, Shuffle, Like Buttons */}
            <button className="btn btn-secondary mb-2" onClick={handleShare}>
              <i className="fa-regular fa-share-from-square"></i>            </button>
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
  );
};

export default MusicPage;
