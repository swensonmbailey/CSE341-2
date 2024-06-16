const { json } = require('express');
const mongodb = require('../db/connect');
const functions = require('../functions/functions');
const validate = require('../validate/validate');




const fullLibrary = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library
    console.log("in getUser");
    // Execute query 
    try {
        
        let library = await functions.getLibrary(req, res);
        
        res.status(200).send(JSON.stringify(library));

    } catch (err) {
        console.log(`library error--> ${err}`);
        res.status(400).send(`library error--> ${err}`);
    }
};


const addBook = async (req, res, next) =>  {
    //addBook uses put to update the library array to include the knew book

    //use getuser function to access user data
    
    try{

        await validate.validateLibraryAddition(req);
        

        let response = await functions.getUser(req, res);
        let libraryid = response.library;
        
        //delete the book id from the user's library

        console.log(`bookId = ${req.body.bookId}`)
        let newLibrary =  libraryid.concat(req.body.bookId);
        // console.log(newLibrary);

        //update the new library to the database

        await functions.updateLibrary(req, res, newLibrary);
    
        let library = await functions.getLibrary(req, res);
    
        console.log("1 book added--");
        res.status(200).send(JSON.stringify(library));

    }catch(err){
        console.log(`Book addition error--> ${err}`);
        res.status(400).send(`Book addition error--> ${err}`);
    }
    


    

}


const deleteBook = async (req, res, next) =>  {

    //deleteBook uses put to update the library array to remove the desired book
    try{
        let response = await functions.getUser(req, res);
        let libraryid = response.library;
        
        //delete the book id from the user's library

        let index = libraryid.indexOf(req.body.bookId);
        if(index < 0){
            throw new Error('Can not remove book. Book is not located in your library.');
        }
        let newLibrary =  libraryid.toSpliced(index, 1);
        console.log(libraryid);

        //update the new library to the database

        await functions.updateLibrary(req, res, newLibrary);
    
        let library = await functions.getLibrary(req, res);
    
        console.log("1 document deleted--");
        res.status(200).send(JSON.stringify(library));

    }catch(err){
        console.log(`Book deletion error--> ${err}`);
        res.status(400).send(`Book deletion error--> ${err}`);
    }
    
    
}


module.exports = {
    fullLibrary,
    addBook,
    deleteBook
};
