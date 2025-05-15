import { Track } from '../../../interfaces/musicInterface';
import { getNextTrack } from './getNextTrack';

export const handleEnded = (
  currentTrack: Track | null,
  tracks: Track[],
  repeatMode: 'none' | 'album' | 'track',
  isShuffling: boolean,
  setCurrentTrack: (track: Track) => void,
  setIsPlaying: (val: boolean) => void,
  audioRef: React.RefObject<HTMLAudioElement>,
  shuffleHistory: Track[],
  setShuffleHistory: (history: Track[]) => void
) => {
  if (!currentTrack) return;

  if (repeatMode === 'track') {
    audioRef.current?.play();
    return;
  }

  const nextTrack = getNextTrack(currentTrack, tracks, isShuffling, repeatMode, shuffleHistory, setShuffleHistory);

  if (nextTrack) {
    setCurrentTrack(nextTrack);
    setIsPlaying(true);
  } else {
    setIsPlaying(false);
  }
};
