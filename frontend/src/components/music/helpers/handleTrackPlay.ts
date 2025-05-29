import { Track } from '../../../interfaces/musicInterface';

export const handleTrackPlay = (
  track: Track,
  currentTrack: Track | null,
  isPlaying: boolean,
  setCurrentTrack: (track: Track) => void,
  setIsPlaying: (play: boolean) => void,
  audioRef: React.RefObject<HTMLAudioElement>
) => {
  if (currentTrack?.id === track.id && isPlaying) {
    audioRef.current?.pause();
    setIsPlaying(false);
  } else {
    setCurrentTrack(track);
    setIsPlaying(true);
  }
};
