const express = require('express');
const router = express.Router();
const TrackInteraction = require('../../models/music/TrackInteraction');
const authenticateUser = require('../../ middleware/authenticateUser');

// POST /api/track-interactions/like
router.post('/like', authenticateUser, async (req, res) => {
  try {
    const { trackId } = req.body; // Contentful track ID
    const userId = req.user.id;

    if (!trackId) return res.status(400).json({ error: 'trackId is required' });

    let interaction = await TrackInteraction.findOne({ userId, contentfulTrackId: trackId });

    if (!interaction) {
      interaction = new TrackInteraction({ userId, contentfulTrackId: trackId });
    }

    // Toggle like status
    interaction.liked = !interaction.liked;
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

module.exports = router;
