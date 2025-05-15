import { Track } from '../../../interfaces/musicInterface';
import { getNextTrack } from './getNextTrack';

export const handleSkipForward = (
  currentTrack: Track | null,
  tracks: Track[],
  isShuffling: boolean,
  repeatMode: 'none' | 'album' | 'track',
  shuffleHistory: Track[],
  setShuffleHistory: (history: Track[]) => void,
  setCurrentTrack: (track: Track) => void,
  setIsPlaying: (val: boolean) => void
) => {
  const nextTrack = getNextTrack(currentTrack, tracks, isShuffling, repeatMode, shuffleHistory, setShuffleHistory);

  if (nextTrack) {
    setCurrentTrack(nextTrack);
    setIsPlaying(true);
  }
};

export const handleSkipBackward = (
  currentTrack: Track | null,
  tracks: Track[],
  isShuffling: boolean,
  shuffleHistory: Track[],
  setShuffleHistory: (history: Track[]) => void,
  setCurrentTrack: (track: Track) => void,
  setIsPlaying: (val: boolean) => void
) => {
  if (!currentTrack || tracks.length === 0) return;

   if (isShuffling) {
    const historyCopy = [...shuffleHistory];
    const previousTrack = historyCopy.pop(); // Get last track from history

    if (previousTrack) {
      setShuffleHistory(historyCopy); // Update history
      setCurrentTrack(previousTrack);
      setIsPlaying(true);
    }
    return;
  }

  const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);

  if (currentIndex > 0) {
    setCurrentTrack(tracks[currentIndex - 1]);
    setIsPlaying(true);
  } else {
    setCurrentTrack(tracks[0]); // Go to first track
    setIsPlaying(true);
  }
};
