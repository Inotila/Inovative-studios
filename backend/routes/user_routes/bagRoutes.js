const express = require('express');
const { createBag, getAllBags } = require('../../controllers/user_controller/bagController');

const router = express.Router();

router.post('/', createBag); 
router.get('/', getAllBags); 

module.exports = router;
