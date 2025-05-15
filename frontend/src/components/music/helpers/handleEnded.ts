// src/components/music/helpers/handleEnded.ts
import { Track } from '../../../interfaces/musicInterface';

export const handleEnded = (
  currentTrack: Track | null,
  tracks: Track[],
  repeatMode: 'none' | 'album' | 'track',
  isShuffling: boolean,
  setCurrentTrack: (track: Track) => void,
  setIsPlaying: (val: boolean) => void,
  audioRef: React.RefObject<HTMLAudioElement>
) => {
  if (!currentTrack) return;

  const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);

  if (repeatMode === 'track') {
    audioRef.current?.play();
  } 
  
  if (isShuffling) {
    const remainingTracks = tracks.filter(t => t.id !== currentTrack.id);
    const nextTrack = remainingTracks[Math.floor(Math.random() * remainingTracks.length)];
    if (nextTrack) {
      setCurrentTrack(nextTrack);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
    return;
  }
  
  if (currentIndex < tracks.length - 1) {
    setCurrentTrack(tracks[currentIndex + 1]);
    setIsPlaying(true);
  } else if (repeatMode === 'album') {
    setCurrentTrack(tracks[0]);
    setIsPlaying(true);
  } else {
    setIsPlaying(false);
  }
};
