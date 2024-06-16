const express = require('express');
const router = express.Router();

const libraryController = require('../controllers/library');

router.get('/:id', libraryController.fullLibrary);
router.put('/:id', libraryController.addBook);
router.delete('/:id', libraryController.deleteBook);


module.exports = router;