// src/services/contentfulService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const fetchAlbums = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/albums`);
    const rawAlbums = response.data;

    const albums = rawAlbums.map((album: any) => ({
      id: album.id,
      Title: album.Title || '',
      Artist: album.Artist || '',
      AlbumCoverArt: album.AlbumCoverArt?.startsWith('//')
        ? `https:${album.AlbumCoverArt}`
        : album.AlbumCoverArt || '',
      Price: album.Price || 0,
      ReleaseDate: album.ReleaseDate || '',
      Genre: album.Genre || '',
      ExecutiveProducer: album.ExecutiveProducer || '',
      OwnerOfAlbumRights: album.OwnerOfAlbumRights || ''
    }));

    return albums;
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};

export const fetchTracks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tracks`);
    const albums = response.data;

    // Flatten and normalize tracks from each album
    const allTracks = albums.flatMap((album: any) => {
      if (!Array.isArray(album.Tracks)) return [];

      return album.Tracks.map((track: any, index: number) => ({
        id: `${album.id}-track-${index}`,
        title: track.Title,
        artist: track.TrackArtist || album.Artist,
        albumId: track.AlbumId,
        audioUrl: track.MusicFile?.startsWith('//')
          ? `https:${track.MusicFile}`
          : track.MusicFile,
        TrackCoverArt: track.TrackCoverArt?.startsWith('//')
          ? `https:${track.TrackCoverArt}`
          :  track.TrackCoverArt || album.AlbumCoverArt || '',
        duration: track.Duration || undefined
      }));
    });

    return allTracks;
  } catch (error) {
    console.error('Error fetching tracks:', error);
    throw error;
  }
};
