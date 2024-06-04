const mongodb = require('../db/connect');
const functions = require('../functions/functions');


const allBooks = async (req, res, next) =>  {
   //all avaliable books for users
   
   
};

const findBook = async (req, res, next ) =>  {

    console.log("in findBook");
    const ObjectId = require('mongodb').ObjectId;
    const bookId = new ObjectId(req.params.id);

    //find a specific book
    try {
        // const database = mongodb.getDb().db("Project2");
        // const collection = database.collection("Books");
        // const response = await collection.find({_id: bookId}).toArray();
        // if(!response[0]){
        //     throw new Error('No book found with matching id.');
        // }
        // console.log("passed to get book found response");
        // console.log(response[0].library);
        // res.setHeader('Content-Type', 'application/json');
        // res.status(200).send(JSON.stringify(response[0]));
        let results =  await functions.findBook(bookId, res,);
        console.log(results);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(results);

    } catch (err) {
        console.log(`findOne error--> ${err}`);
        res.status(400).send(`findOne error--> ${err}`);
    }

};


module.exports = {
    allBooks,
    findBook
};



