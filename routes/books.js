const express = require('express');
const routes = express.Router();

const booksController = require('../controllers/books');

router.get('/', booksController);
router.get('/:id', booksController);


module.exports = routes;