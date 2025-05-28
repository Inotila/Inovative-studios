const express = require('express');
const router = express.Router();
const TrackInteraction = require('../../models/music/TrackInteraction');
const authenticateUser = require('../../middleware/authenticateUser');

// Toggle Like
router.post('/like', authenticateUser, async (req, res) => {
  try {
    const { trackId } = req.body;
    const userId = req.user.id;

    if (!trackId) return res.status(400).json({ error: 'trackId is required' });

    let interaction = await TrackInteraction.findOne({ userId, contentfulTrackId: trackId });

    if (!interaction) {
      interaction = new TrackInteraction({ userId, contentfulTrackId: trackId, liked: true });
    } else {
      interaction.liked = !interaction.liked;
    }

    await interaction.save();

    res.json({
      success: true,
      trackId,
      liked: interaction.liked,
    });
  } catch (err) {
    console.error('Error toggling like:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get Like Status
router.get('/like-status', authenticateUser, async (req, res) => {
  try {
    const trackId = req.query.trackId;
    const userId = req.user.id;

    if (!trackId) return res.status(400).json({ error: 'trackId is required' });

    const interaction = await TrackInteraction.findOne({ userId, contentfulTrackId: trackId });

    res.json({ isLiked: interaction?.liked === true });
  } catch (err) {
    console.error('Error fetching like status:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
