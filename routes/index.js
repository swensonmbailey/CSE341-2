const routes = require('express').Router();


routes.use('/user', require('./user'));
routes.use('/books', require('./books'));
routes.use('/', require('./swagger'));

routes.use(
    '/',
    (docData = (req, res) => {
        let docData = {
        documentationURL: '',
        };
        res.send(docData);
    })
);

module.exports = routes;