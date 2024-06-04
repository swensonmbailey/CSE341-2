
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const findBook = async (book, res, next ) =>  {

    console.log("in function findBook");
    let bookId = new ObjectId(book);
    

    console.log('after objectId');

    //find a specific book
    try {

        let collection = mongodb.getCollection("Books");
        
        const response = await collection.find({_id: bookId}).toArray();
        if(!response[0]){
            throw new Error('No book found with matching id.');
        }
        console.log("passed to get book found response");
        console.log(response[0]);
        return response[0];

    } catch (err) {
        console.log(`findOne error--> ${err}`);
        res.status(400).send(`findOne error--> ${err}`);
    }

};




const getLibrary = async (req, res, next ) =>  {
    let response = await getUser(req, res);
        console.log(response.library);
        let libraryid = response.library;

        if(libraryid.length < 1) {
            res.status(200).send('No Books in Library');
        }else{
    
            // Execute query for each id in libraryid array. results (book info) will be placed into library array
            let library = [];

            for (let i = 0; i < libraryid.length; i++){
                

                let response = await findBook(libraryid[i], res);
                library.push(response);
            } 
            console.log('returning library');
            console.log(library);
            return library;
        }    
};


const updateLibrary = async (req, res, newLibrary, next ) =>  {
    const ObjectId = require('mongodb').ObjectId;
    const userId = new ObjectId(req.params.id);
        
    // Get the database and collection on which to run the operation
    let collection = mongodb.getCollection("Users");
    
    console.log('in updateLibrary');
    console.log(newLibrary);
    // Execute update
    await collection.updateOne({_id: userId}, {$set:{library: newLibrary}}, function(err, res) {
        if (err){
            console.log("not updated");
            res.status(500).send(`${err}`);
        } 
    });


}


const getUser = async (user, res, next ) =>  {


        

    console.log("in function getUser");

    const userId = new ObjectId(user.params.id);
    
    
    // Get the database and collection on which to run the operation
    
    
    // Execute query 
    try {
        let collection = mongodb.getCollection("Users");
        
        const response = await collection.find({_id: userId}).toArray();
        if(!response[0]){
            throw new Error('No user found with matching id.');
        }
        console.log("passed to get user found response");
        console.log(response);
        
        return response[0];

    } catch (err) {
        console.log(`findOne error--> ${err}`);
        res.status(400).send(`findOne error--> ${err}`);
    }
    
    

};


module.exports = {
    getUser,
    getLibrary,
    findBook,
    updateLibrary
};