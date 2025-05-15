import { Track } from '../../../interfaces/musicInterface';

export const getNextTrack = (
  currentTrack: Track | null,
  tracks: Track[],
  isShuffling: boolean,
  repeatMode: 'none' | 'album' | 'track',
  shuffleHistory: Track[],
  setShuffleHistory?: (history: Track[]) => void
): Track | null => {
  if (!currentTrack || tracks.length === 0) return null;

  const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);

  if (isShuffling) {
    const remainingTracks = tracks.filter(t =>
      t.id !== currentTrack.id &&
      !shuffleHistory.some(h => h.id === t.id)
    );

    const nextTrack = remainingTracks.length > 0
      ? remainingTracks[Math.floor(Math.random() * remainingTracks.length)]
      : tracks[Math.floor(Math.random() * tracks.length)];

    if (nextTrack && setShuffleHistory) {
      const newHistory = [...shuffleHistory, currentTrack];
      const limitedHistory = newHistory.slice(-20);
      setShuffleHistory(limitedHistory);
    }

    return nextTrack;
  }

  if (currentIndex < tracks.length - 1) {
    return tracks[currentIndex + 1];
  } else if (repeatMode === 'album') {
    return tracks[0];
  }

  return null;
};
