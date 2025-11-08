const express = require('express');
const Hotel = require('../models/hotel');
const router = express.Router();
const getformcontroller=require('../controllers/formcontroller');
router.get('/',getformcontroller.getform);
router.post('/api/users', getformcontroller.postform);
router.get('/api/users/:id', getformcontroller.getUserById);
router.put('/api/users/:id', getformcontroller.updateUser);

module.exports = router;
