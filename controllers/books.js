const mongodb = require('../db/connect');
const functions = require('../functions/functions');


const allBooks = async (req, res, next) =>  {
    //all avaliable books for users
    console.log("in allBooks");

    try{
        let collection = mongodb.getCollection("Books");
        const response = await collection.find().toArray();
        if(!response[0]){
            throw new Error('No books found.');
        }
        console.log(response);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(response);
        
    }catch(err){
        console.log(`find Books error--> ${err}`);
        res.status(400).send(`find Books error--> ${err}`);
    }
};

const findBook = async (req, res, next ) =>  {

    console.log("in findBook");
    
    const bookId = req.params.bookId;

    //find a specific book
    try {
        let results =  await functions.findBook(bookId, res,);
        console.log(results);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(results);

    } catch (err) {
        console.log(`find book error--> ${err}`);
        res.status(400).send(`find book error--> ${err}`);
    }

};


module.exports = {
    allBooks,
    findBook
};



