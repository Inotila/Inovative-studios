import React, { useEffect, useState } from 'react';
import './assets/css/musicPage.css';
import uncool from '../assets/images/entertianment/Front-cover-art.jpg';
import { fetchAlbums, fetchTracks } from '../../services/contentfulService';
import MusicSelection from './MusicSelection';
import { Album, Track } from '../../interfaces/musicInterface';

const MusicPage: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTab, setSelectedTab] = useState<'albums' | 'tracks' | 'playlist'>('albums');


  const handleTabClick = async (tab: 'albums' | 'tracks' | 'playlist') => {
    setSelectedTab(tab);

    if (tab === 'tracks') {

      try {
        const fetchedTracks = await fetchTracks();
        setTracks(fetchedTracks);
      } catch (error) {
        console.error('Failed to fetch tracks:', error);
      }
    }
  };

  const handleAlbumClick = async (albumId: string) => {

    setSelectedTab('tracks');

    try {
      const fetchedTracks = await fetchTracks();
      const filteredTracks = fetchedTracks.filter(
        (track: Track) => track.albumId === albumId
      );
      setTracks(filteredTracks);
    } catch (error) {
      console.error('Failed to fetch tracks for album:', error);
    }
  };

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const albums = await fetchAlbums();
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

      {/* Albums & Tracks Section */}
      <div className="row justify-content-center mt-3">
        <MusicSelection
          albums={albums}
          tracks={tracks}
          selectedTab={selectedTab}
          handleTabClick={handleTabClick}
          handleAlbumClick={handleAlbumClick}
        />
      </div>

      {/* Music Player */}
      <div className="row justify-content-center align-items-center">
        <div className="col-auto music-player-col d-flex justify-content-center align-items-center">
          <div className="custom-music-player shadow-container d-flex">
            {/* Cover Art */}
            <div className="album-art-container text-center me-auto">
              <img
                src={uncool}
                alt={'Placeholder'}
                className="music-player-cover-art"
              />
            </div>

            {/* Timeline & Controls */}
            <div className="controls-wrapper d-flex flex-column align-items-center justify-content-center flex-grow-1">
              <div className="music-timeline">
                <p>00:00 / 03:45</p>
              </div>
              <div className="music-controls">
                <button className="btn btn-secondary">
                  <i className="fa-solid fa-backward"></i>
                </button>
                <button className="btn btn-primary mx-2">
                  <i className="fas fa-play"></i>
                </button>
                <button className="btn btn-secondary">
                  <i className="fa-solid fa-forward"></i>
                </button>
              </div>
            </div>

            {/* Extra Actions */}
            <div className="d-flex flex-column align-items-center">
              <button className="btn btn-secondary mb-2">
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
