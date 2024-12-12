import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/index.css';
import './assets/css/musicPage.css';

interface Album {
  Album_ID: string;
  Title: string;
  Album_cover_art: string | null;
}

const MusicPage: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  // Fetch albums data from the backend
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/albums');
        console.log('Fetched Albums:', response.data); // Log full data for troubleshooting
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

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

      {/* Row 2: Album Cards */}
      <div className="row music-selection-container">
        {/* Loop through albums and create a card for each one */}
        {albums.map((album) => {
          // Debugging: Log Album_cover_art to see its structure
          console.log('Album Cover Art:', album.Album_cover_art);

          const coverImageUrl = album.Album_cover_art;

          // Ensure the URL is complete by adding HTTPS if necessary
          const fullImageUrl = coverImageUrl && coverImageUrl.startsWith('//')
            ? 'https:' + coverImageUrl
            : coverImageUrl;

          // Debugging: Log the fullImageUrl
          console.log('Full Image URL:', fullImageUrl);

          return (
            <div key={album.Album_ID} className="col-md-4 mb-4">
              <div className="card album-card">
                <img
                  src={fullImageUrl || 'https://via.placeholder.com/150'} // Fallback if the image URL is missing
                  alt={album.Title}
                  className="card-img-top album-cover"
                />
                <div className="card-body">
                  <h5 className="card-title">{album.Title}</h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row">
          <div className="col">
            <button className='home-link-button'>Albums</button>
          </div>
          <div className="col">
            <button className='home-link-button'>Tracks</button>
          </div>
          <div className="col">
            <button className='home-link-button'>Playlist</button>
          </div>
        </div>
    </div>
  );
};

export default MusicPage;
