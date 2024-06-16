const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');

router.get('/', booksController.allBooks);
router.post('/', booksController.createBook);
router.get('/:bookId', booksController.findBook);
router.put('/:bookId', booksController.updateBook);
router.delete('/:bookId', booksController.deleteBook);


module.exports = router;