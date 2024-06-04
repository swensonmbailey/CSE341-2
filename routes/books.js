const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');

// router.get('/', booksController);
router.get('/:id', booksController.findBook);


module.exports = router;