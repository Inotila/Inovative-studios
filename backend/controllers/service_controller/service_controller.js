const { Service } = require('../../models');

// Fetch all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch a specific service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (err) {
    console.error('Error fetching service:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
};