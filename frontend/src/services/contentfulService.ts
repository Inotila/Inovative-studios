// src/services/contentfulService.ts
import axios from 'axios';
import { features } from 'process';

const API_BASE_URL = 'http://localhost:3001/api';

export const fetchAlbums = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/albums`);
    const rawAlbums = response.data;

    const albums = rawAlbums.map((album: any) => ({
      id: album.id,
      Title: album.Title || '',
      Artist: album.Artist || '',
      AlbumCoverArt: album.AlbumCoverArt?.startsWith('//')
        ? `https:${album.AlbumCoverArt}`
        : album.AlbumCoverArt || '',
      Price: album.Price || 0,
      ReleaseDate: album.ReleaseDate || '',
      Genre: album.Genre || '',
      ExecutiveProducer: album.ExecutiveProducer || '',
      OwnerOfAlbumRights: album.OwnerOfAlbumRights || ''
    }));

    return albums;
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};

export const fetchTracks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tracks`);
    const albums = response.data;

    // Flatten and normalize tracks from each album
    const allTracks = albums.flatMap((album: any) => {
      if (!Array.isArray(album.Tracks)) return [];

      return album.Tracks.map((track: any, index: number) => ({
        id: `${album.id}-track-${index}`,
        title: track.Title,
        artist: track.TrackArtist || album.Artist,
        featuredArtists: Array.isArray(track.FeaturedArtists) ? 
        track.FeaturedArtists.join(', ') 
        : track.FeaturedArtists || '',
        albumId: track.AlbumId,
        audioUrl: track.MusicFile?.startsWith('//')
          ? `https:${track.MusicFile}`
          : track.MusicFile,
        TrackCoverArt: track.TrackCoverArt?.startsWith('//')
          ? `https:${track.TrackCoverArt}`
          :  track.TrackCoverArt || album.AlbumCoverArt || '',
        duration: track.Duration || undefined
      }));
    });

    return allTracks;
  } catch (error) {
    console.error('Error fetching tracks:', error);
    throw error;
  }
};
export const fetchServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services`);
    const rawServices = response.data;

    const services = rawServices.map((service: any) => ({
      id: service.id,
      Title: service.Title || '',
      TypeOfService: service.TypeOfService || '',
      SummaryDescription: service.SummaryDescription || '',
      GeneralDescription: service.GeneralDescription || '',
      DesignProcess: service.DesignProcess || '',
      ThumbnailCover: service.ThumbnailCover?.startsWith('//')
        ? `https:${service.ThumbnailCover}`
        : service.ThumbnailCover || '',
      IsAvailable: service.IsAvailable || false,
      RelatedProjects: service.RelatedProjects || ''
    }));

    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects`);
    const rawProjects = response.data;

    const projects = rawProjects.map((project: any) => ({
      id: project.id,
      Title: project.Title || '',
      SummaryDescription: project.SummaryDescription || '',
      GeneralDescription: project.GeneralDescription || '',
      Link: project.Link || '',
      ThumbnailCover: project.ThumbnailCover?.startsWith('//')
        ? `https:${project.ThumbnailCover}`
        : project.ThumbnailCover || '',
      ProjectOwner: project.ProjectOwner || '',
      FundingGoals: project.FundingGoals || '',
      ReleaseDate: project.ReleaseDate || '',
      ProjectReleaseStatus: project.ProjectReleaseStatus || '',
      Version: project.Version || ''
    }));

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};
