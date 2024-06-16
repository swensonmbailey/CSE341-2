const mongodb = require('../db/connect');
const functions = require('../functions/functions');
const validate = require('../validate/validate');



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
        console.log(`Book error--> ${err}`);
        res.status(400).send(`Book error--> ${err}`);
    }
};

const findBook = async (req, res, next ) =>  {

    console.log("in findBook");
    
    const bookId = req.params.bookId;

    //find a specific book
    try {

        validate.validateId(req.params);        

        let results =  await functions.findBook(bookId, res,);
        console.log(results);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(results);

    } catch (err) {
        console.log(`find book error--> ${err}`);
        res.status(400).send(`find book error--> ${err}`);
    }

};


const createBook = async (req, res, next) =>  {
    
    console.log("in createBook");


    try{

        validate.validateBook(req.body);


        // Get the database and collection on which to run the operation
        const collection = mongodb.getCollection("Books");
        await collection.insertOne(req.body).then(result => {

            if (result.acknowledged) {
                console.log(result.insertedId.toString());
                res.status(201).send(result.insertedId);
            } else {
                throw new Error('Some error occurred while creating the contact.');
            }
            
        });

    }catch(err){
        console.log(`Create Book error--> ${err}`);
        res.status(500).send(`Create Book error--> ${err}`);
    }
    
}


const updateBook = async (req, res, next) =>  {

    console.log("in putRoute");
    const ObjectId = require('mongodb').ObjectId;
    const bookId = new ObjectId(req.params.bookId);


    try{

        validate.validateBook(req.body);

        // Get the database and collection on which to run the operation
        const collection = mongodb.getCollection("Books");
        
        // Execute update
        await collection.updateOne({_id: bookId}, {$set: req.body}, function(err, res) {
            if (err){
                throw new Error('Could not update book. Try again later.');
            } 
        });

        console.log("1 document updated--");
        res.status(204).send();
    }catch (err) {
        console.log(`Book update error--> ${err}`);
        res.status(400).send(`Book update error--> ${err}`);
    }

}


const deleteBook = async (req, res, next) =>  {

    const ObjectId = require('mongodb').ObjectId;
    const bookId = new ObjectId(req.params.bookId);

    try{
        // Get the database and collection on which to run the operation
        const collection = mongodb.getCollection("Books");

        // Execute delete
        await collection.deleteOne({_id: bookId}, function(err, obj) {
            if (err){
                console.log("book not deleted");
                throw new Error('book not deleted');
            }
            
        });

        console.log("1 document deleted--");
        res.status(200).send();

    }catch(err){
        console.log(`User deletion error--> ${err}`);
        res.status(400).send(`User deletion error--> ${err}`);
    }

}


module.exports = {
    allBooks,
    findBook,
    createBook,
    updateBook,
    deleteBook
};



