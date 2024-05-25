const mongodb = require('../db/connect');



const fullLibrary = async (req, res, next ) =>  {
    //will be used as a findmany to find the books in the use's library

        

    

};


const addBook = async (req, res, next) =>  {
    //addBook uses put to update the library array to include the knew book

    

}


const deleteBook = async (req, res, next) =>  {

    //deleteBook uses put to update the library array to remove the desired book

    
}


module.exports = {
    fullLibrary,
    addBook,
    deleteBook
};
