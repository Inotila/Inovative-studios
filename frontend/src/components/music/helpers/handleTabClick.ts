// src/components/music/helpers/handleTabClick.ts
import { fetchTracks } from '../../../services/contentfulService';
import { Track } from '../../../interfaces/musicInterface';

export const handleTabClick = async (
  tab: 'albums' | 'tracks' | 'playlist',
  setSelectedTab: (tab: 'albums' | 'tracks' | 'playlist') => void,
  setTracks: (tracks: Track[]) => void
) => {
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
