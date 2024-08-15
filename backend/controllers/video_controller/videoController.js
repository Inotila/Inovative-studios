'use strict';
const { Video } = require('../../models'); // Adjust the path based on your structure

module.exports = {
  // Get all videos
  async getAllVideos(req, res) {
    try {
      const videos = await Video.findAll();
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch videos' });
    }
  },

  // Get a single video by ID
  async getVideoById(req, res) {
    try {
      const video = await Video.findByPk(req.params.id);
      if (!video) {
        return res.status(404).json({ error: 'Video not found' });
      }
      res.status(200).json(video);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch video' });
    }
  },

  // Create a new video
  async createVideo(req, res) {
    try {
      const newVideo = await Video.create(req.body);
      res.status(201).json(newVideo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create video' });
    }
  },

  // Update an existing video
  async updateVideo(req, res) {
    try {
      const video = await Video.findByPk(req.params.id);
      if (!video) {
        return res.status(404).json({ error: 'Video not found' });
      }
      await video.update(req.body);
      res.status(200).json(video);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update video' });
    }
  },

  // Delete a video
  async deleteVideo(req, res) {
    try {
      const video = await Video.findByPk(req.params.id);
      if (!video) {
        return res.status(404).json({ error: 'Video not found' });
      }
      await video.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete video' });
    }
  },
};
