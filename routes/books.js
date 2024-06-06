const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');

router.get('/', booksController.allBooks);
router.get('/:bookId', booksController.findBook);


module.exports = router;