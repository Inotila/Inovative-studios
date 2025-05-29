import { fetchTracks } from '../../../services/contentfulService';
import { Track } from '../../../interfaces/musicInterface';

export const handleAlbumClick = async (
  albumId: string,
  setSelectedTab: (tab: 'albums' | 'tracks' | 'playlist') => void,
  setTracks: (tracks: Track[]) => void
) => {
  setSelectedTab('tracks');

  try {
    const fetchedTracks = await fetchTracks();
    const filteredTracks = fetchedTracks.filter((track: Track) => track.albumId === albumId);
    setTracks(filteredTracks);
  } catch (error) {
    console.error('Failed to fetch tracks for album:', error);
  }
};
