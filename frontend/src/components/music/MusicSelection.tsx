import React, { useRef, useState } from 'react';
import uncool from '../assets/images/entertianment/Front-cover-art.jpg';
import { Album, Track } from '../../interfaces/musicInterface';
import LikeButton from "../music/likeButton";

interface MusicSelectionProps {
    albums: Album[];
    tracks: Track[];
    selectedTab: 'albums' | 'tracks' | 'playlist';
    handleTabClick: (tab: 'albums' | 'tracks' | 'playlist') => void;
    handleAlbumClick: (albumId: string) => void;
    currentTrack: Track | null;
    isPlaying: boolean;
    handleTrackPlay: (track: Track) => void;
    onCoverClick: (imgSrc: string) => void;
}

const MusicSelection: React.FC<MusicSelectionProps> = ({
    albums,
    tracks,
    selectedTab,
    handleTabClick,
    handleAlbumClick,
    currentTrack,
    isPlaying,
    handleTrackPlay,
    onCoverClick
}) => {

    return (
        <div className="music-selection-container shadow-container">
            <div className="track-album-playlist-container mb-3">
                <button
                    className={`btn ${selectedTab === 'albums' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleTabClick('albums')}
                >
                    Albums
                </button>
                <button
                    className={`btn mx-3 ${selectedTab === 'tracks' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleTabClick('tracks')}
                >
                    Tracks
                </button>
                <button
                    className={`btn ${selectedTab === 'playlist' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleTabClick('playlist')}
                    disabled
                >
                    Playlist
                </button>
            </div>
            <div className="music-selection-content flex-grow-1 overflow-auto w-100">
                {selectedTab === 'albums' && (
                    <div className="album-cards-row d-flex flex-row flex-wrap justify-content-center">
                        {albums.map((album) => (
                            <div className="album-card-container mx-2 mb-4" key={album.id}>
                                <div
                                    className="card shadow-container album-card flex-column cursor-pointer"
                                    onClick={() => handleAlbumClick(album.id)}
                                >
                                    <img
                                        src={album.AlbumCoverArt || uncool}
                                        alt={album.Title}
                                        className="card-img-top music-cover"
                                    />
                                    <div className="card-body music-card-body d-flex flex-column justify-content-between">
                                        <h5 className="card-title mt-1">{album.Title}</h5>
                                        <p className="card-text">{album.Artist}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedTab === 'tracks' && (
                    <div className="track-list-container w-100">
                        <ul className="list-group">
                            {tracks.map((track) => (
                                <li
                                    className="list-group-item track-list d-flex justify-content-between align-items-center"
                                    key={track.id}
                                >
                                    <div className='selection-track-container d-flex align-items-center'>
                                        <img
                                            className='selection-track-cover-art-img me-2'
                                            src={track.TrackCoverArt}
                                            alt=""
                                            onClick={() => onCoverClick(track.TrackCoverArt ?? uncool)}
                                        />
                                        <div className='track-artist-details-container d-flex align-items-start'>
                                            <div className='track-artist-details d-flex flex-row'>
                                                <h5>{track.title}</h5> — <p>{track.artist}</p>
                                            </div>
                                            <div className='featured-artists'>
                                                {track.featuredArtists && (
                                                    <p className="mb-0 ">feat. {track.featuredArtists}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="track-controls d-flex ">
                                        <LikeButton trackId={track.id} />
                                        <div className='play-pause-btn-container'>
                                            <button
                                                className="btn btn-primary mx-2"
                                                onClick={() => handleTrackPlay(track)}
                                            >
                                                <i className={`fas ${currentTrack?.id === track.id ? 'fa-pause' : 'fa-play'}`}></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MusicSelection;
