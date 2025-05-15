// src/components/music/helpers/repeatMode.ts
export const toggleRepeatMode = (prevMode: 'none' | 'album' | 'track'): 'none' | 'album' | 'track' => {
  if (prevMode === 'none') return 'album';
  if (prevMode === 'album') return 'track';
  return 'none';
};
