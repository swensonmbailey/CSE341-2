const express = require('express');
const router = express.Router();

router.use('/library', require('./library'));
const userController = require('../controllers/user');


router.get('/:id', userController);

//post route

router.post('/', userController);

//put route
router.put('/:id', userController);

//delete route
router.delete('/:id', userController);

module.exports = router;