const express = require('express');
const routes = express.Router();

const libraryController = require('../controllers/library');

router.get('/:id', libraryController);


module.exports = routes;