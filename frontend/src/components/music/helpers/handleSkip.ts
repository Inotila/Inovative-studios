import { Track } from '../../../interfaces/musicInterface';

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
  if (!currentTrack || tracks.length === 0) return;

  const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);

  if (isShuffling) {
       const remainingTracks = tracks.filter(t => 
      t.id !== currentTrack.id && !shuffleHistory.some(h => h.id === t.id)
    );

    const nextTrack = remainingTracks.length > 0
      ? remainingTracks[Math.floor(Math.random() * remainingTracks.length)]
      : tracks[Math.floor(Math.random() * tracks.length)]; // fallback to any if all have been played

    if (nextTrack) {
        setShuffleHistory([...shuffleHistory, currentTrack]); // push current into history
        setCurrentTrack(nextTrack);
        setIsPlaying(true);
    }
    return;
  }

  if (currentIndex < tracks.length - 1) {
    setCurrentTrack(tracks[currentIndex + 1]);
    setIsPlaying(true);
  } else if (repeatMode === 'album') {
    setCurrentTrack(tracks[0]);
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
