const contentStore = require('../../utils/js/contentStore');

const getAllServices = (req, res) => {
  try {
    const services = contentStore.getServices();
    res.json(services);
  } catch (error) {
    console.error('Error getting services:', error);
    res.status(500).json({ error: 'Failed to retrieve services' });
  }
};

module.exports = {
  getAllServices,
};
