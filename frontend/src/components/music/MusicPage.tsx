import React, { useEffect, useRef, useState } from 'react';
import './assets/css/musicPage.css';
import OverlayImageViewer from './OverlayImageViewer';
import uncool from '../assets/images/entertianment/Front-cover-art.jpg';
import { fetchAlbums } from '../../services/contentfulService';
import MusicSelection from './MusicSelection';
import { Album, Track, RepeatMode } from '../../interfaces/musicInterface';
import { formatTime } from './helpers/formatTime';
import { toggleRepeatMode } from './helpers/repeatMode';
import { handleEnded } from './helpers/handleEnded';
import { handleTrackPlay } from './helpers/handleTrackPlay';
import { handleTabClick } from './helpers/handleTabClick';
import { handleAlbumClick } from './helpers/handleAlbumClick';
import { handleSkipForward, handleSkipBackward } from './helpers/handleSkip';
import LikeButton from "../music/likeButton";



const MusicPage: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTab, setSelectedTab] = useState<'albums' | 'tracks' | 'playlist'>('albums');

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [repeatMode, setRepeatMode] = useState<RepeatMode>('none');

  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleHistory, setShuffleHistory] = useState<Track[]>([]);

  const volumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [isMuted, setIsMuted] = useState(false);

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [volume, setVolume] = useState(1);

  const [overlayImageSrc, setOverlayImageSrc] = useState<string | null>(null);

  const openImageOverlay = (src: string) => setOverlayImageSrc(src);
  const closeImageOverlay = () => setOverlayImageSrc(null);

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

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentTrack]);

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(prev => {
      const next = !prev;
      if (next) {
        resetVolumeTimer(3000);
      } else {
        clearVolumeTimer();
      }
      return next;
    });
  };

  const resetVolumeTimer = (timeout: number) => {
    clearVolumeTimer();
    volumeTimerRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, timeout);
  };

  const clearVolumeTimer = () => {
    if (volumeTimerRef.current) {
      clearTimeout(volumeTimerRef.current);
      volumeTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearVolumeTimer();
  }, []);

  useEffect(() => {
    console.log('Repeat Mode:', repeatMode);
    console.log('Shuffling:', isShuffling);
  }, [repeatMode, isShuffling]);

  return (
    <div className="container-fluid text-center">
      {/* Banner */}
      <div className="row justify-content-center">
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
          handleTabClick={(tab) => handleTabClick(tab, setSelectedTab, setTracks)}
          handleAlbumClick={(albumId) =>
            handleAlbumClick(albumId, setSelectedTab, setTracks)
          }
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          handleTrackPlay={(track) =>
            handleTrackPlay(track, currentTrack, isPlaying, setCurrentTrack, setIsPlaying, audioRef)
          }
          onCoverClick={openImageOverlay}
        />
      </div>

      {/* Music Player */}
      <div className="row justify-content-center align-items-center mt-3">
        <div className="col-auto music-player-col d-flex justify-content-center align-items-center">
          <div className="custom-music-player shadow-container d-flex">
            {/* Cover Art */}
            <div className="album-art-container text-center me-auto">
              <img
                src={
                  currentTrack?.TrackCoverArt ||
                  albums.find((album) => album.id === currentTrack?.albumId)?.AlbumCoverArt ||
                  uncool
                }
                alt={currentTrack?.title || 'Placeholder'}
                className="music-player-cover-art"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  const imgSrc =
                    currentTrack?.TrackCoverArt ||
                    albums.find((album) => album.id === currentTrack?.albumId)?.AlbumCoverArt ||
                    uncool;
                  openImageOverlay(imgSrc);
                }}
              />

              <h6 className='mt-2'> {currentTrack?.artist} </h6>
              <h6 className='mt-1'> {albums.find((album) => album.id === currentTrack?.albumId)?.Title} </h6>
            </div>
            {/* Timeline & Controls */}
            <div className="controls-wrapper d-flex flex-column align-items-center justify-content-center flex-grow-1">
              <h3>{currentTrack?.title}</h3>
              <div className='featured-artists'>
                {currentTrack?.featuredArtists && (
                  <p className="mb-0 ">feat. {currentTrack?.featuredArtists}</p>
                )}
              </div>
              <div className="music-timeline d-flex align-items-center w-100 my-3">
                <span className="me-2" style={{ fontSize: '0.9rem' }}>{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration}
                  step="0.1"
                  value={currentTime}
                  onChange={(e) => {
                    const newTime = parseFloat(e.target.value);
                    if (audioRef.current) {
                      audioRef.current.currentTime = newTime;
                      setCurrentTime(newTime);
                    }
                  }}
                  className="form-range flex-grow-1 mx-2"
                />
                <span className="ms-2" style={{ fontSize: '0.9rem' }}>{formatTime(duration)}</span>
              </div>
              <div className="music-controls">
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    handleSkipBackward(currentTrack, tracks, isShuffling, shuffleHistory, setShuffleHistory, setCurrentTrack, setIsPlaying)
                  }
                  disabled={!currentTrack}
                >
                  <i className="fa-solid fa-backward"></i>
                </button>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={!currentTrack}
                >
                  <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    handleSkipForward(currentTrack, tracks, isShuffling, repeatMode, shuffleHistory, setShuffleHistory, setCurrentTrack, setIsPlaying)
                  }
                  disabled={!currentTrack}
                >
                  <i className="fa-solid fa-forward"></i>
                </button>
              </div>
            </div>

            {/* Extra Actions */}
            <div className="d-flex flex-column align-items-center justify-content-center extra-btns-container" style={{ minWidth: '50px' }}>
              {showVolumeSlider ? (
                <>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      const newVolume = parseFloat(e.target.value);
                      if (audioRef.current) {
                        audioRef.current.volume = newVolume;
                        setIsMuted(newVolume === 0);
                      }
                      setVolume(newVolume);
                      resetVolumeTimer(3000);
                    }}
                    className="volume-slider my-auto"
                    style={{ transform: 'rotate(-90deg)', height: '100px' }}
                  />
                </>
              ) : (
                <>
                  <LikeButton trackId={currentTrack?.id || ''} />
                  <button
                    className={`btn mb-2 ${!isShuffling ? 'music-btn-disabled' : ''}`}
                    onClick={() => setIsShuffling(prev => !prev)}
                  >
                    <i className="fa-solid fa-shuffle"></i>
                  </button>
                  <button
                    className={`btn mb-2 ${repeatMode === 'none' ? 'music-btn-disabled' : ''}`}
                    onClick={() => setRepeatMode(prev => toggleRepeatMode(prev))}
                  >
                    <i className="fa-solid fa-repeat"></i>
                    {repeatMode === 'track' && <span className='repeat-current-track'>1</span>}
                  </button>
                  <button
                    className="btn volume-btn mt-2"
                    onClick={toggleVolumeSlider}
                  >
                    {isMuted ? (
                      <i className="fa-solid fa-volume-xmark"></i>
                    ) : (
                      <i className="fa-solid fa-volume-low"></i>
                    )}
                  </button>
                </>
              )}

            </div>
            {/* Hidden Audio Element */}
            <audio
              ref={audioRef}
              src={currentTrack?.audioUrl}
              muted={isMuted}
              onEnded={() =>
                handleEnded(currentTrack, tracks, repeatMode, isShuffling, setCurrentTrack, setIsPlaying,
                  audioRef, shuffleHistory, setShuffleHistory)
              }
              hidden
            />
          </div>
        </div>
      </div>
      <OverlayImageViewer imgSrc={overlayImageSrc} onClose={closeImageOverlay} />

    </div>
  );
};

export default MusicPage;
