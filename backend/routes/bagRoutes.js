const express = require('express');
const { createBag, getAllBags } = require('../controllers/bagController');

const router = express.Router();

router.post('/', createBag); 
router.get('/', getAllBags); 

module.exports = router;
