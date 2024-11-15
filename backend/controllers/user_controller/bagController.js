const { Bag } = require('../../models');

const createBag = async (req, res) => {
  try {
    const { User_ID, Items } = req.body;
    const bag = await Bag.create({ User_ID, Items });
    res.status(201).json(bag);
  } catch (error) {
    res.status(500).json({ error: 'Error creating bag' });
  }
};

const getAllBags = async (req, res) => {
  try {
    const bags = await Bag.findAll();
    res.status(200).json(bags);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bags' });
  }
};

module.exports = {
  createBag,
  getAllBags,
};
