'use strict';
const { Series } = require('../../models'); // Adjust the path based on your structure

module.exports = {
  // Get all series
  async getAllSeries(req, res) {
    try {
      const series = await Series.findAll();
      res.status(200).json(series);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch series' });
    }
  },

  // Get a single series by ID
  async getSeriesById(req, res) {
    try {
      const series = await Series.findByPk(req.params.id);
      if (!series) {
        return res.status(404).json({ error: 'Series not found' });
      }
      res.status(200).json(series);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch series' });
    }
  },

  // Create a new series
  async createSeries(req, res) {
    try {
      const newSeries = await Series.create(req.body);
      res.status(201).json(newSeries);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create series' });
    }
  },

  // Update an existing series
  async updateSeries(req, res) {
    try {
      const series = await Series.findByPk(req.params.id);
      if (!series) {
        return res.status(404).json({ error: 'Series not found' });
      }
      await series.update(req.body);
      res.status(200).json(series);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update series' });
    }
  },

  // Delete a series
  async deleteSeries(req, res) {
    try {
      const series = await Series.findByPk(req.params.id);
      if (!series) {
        return res.status(404).json({ error: 'Series not found' });
      }
      await series.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete series' });
    }
  },
};
