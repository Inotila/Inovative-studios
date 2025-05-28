const mongoose = require('mongoose');

const TrackInteractionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contentfulTrackId: { type: String, required: true },
  liked: { type: Boolean, default: false },
}, { timestamps: true });

TrackInteractionSchema.index({ userId: 1, contentfulTrackId: 1 }, { unique: true });

module.exports = mongoose.model('TrackInteraction', TrackInteractionSchema);
