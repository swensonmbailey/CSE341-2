const express = require('express');
const router = express.Router();

router.use('/library', require('./library'));
const userController = require('../controllers/user');


router.get('/:id', userController.getUser);

//post route

router.post('/', userController.createUser);

//put route
router.put('/:id', userController.updateUser);

//delete route
router.delete('/:id', userController.deleteUser);

module.exports = router;