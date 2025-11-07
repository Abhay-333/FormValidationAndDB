const express = require('express');
const Hotel = require('../models/hotel');
const router = express.Router();
const getformcontroller=require('../controllers/formcontroller');
router.get('/',getformcontroller.getform);
router.post('/api/users', getformcontroller.postform);

module.exports = router;
