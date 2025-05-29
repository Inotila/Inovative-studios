export interface Album {
  id: string;
  Title: string;
  Artist: string;
  AlbumCoverArt: string;
  Price: number;
  ReleaseDate: string;
  Genre: string;
  ExecutiveProducer: string;
  OwnerOfAlbumRights: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  featuredArtists:string;
  albumId?: string;
  audioUrl: string;
  duration?: string;
  TrackCoverArt?: string
}

export type RepeatMode = 'none' | 'album' | 'track';
