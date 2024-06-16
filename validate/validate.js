var validator = require('validator');
const mongodb = require('../db/connect');
const functions = require('../functions/functions');


const validateUser = (data) => {

    console.log(data.firstName);
    if(!validator.isAlpha(data.firstName)){
        throw new Error('First name not valid for entry.');
    }
    if(!validator.isAlpha(data.lastName)){
        throw new Error('Last name not valid for entry.');
    }
    if(!validator.isEmail(data.email)){
        throw new Error('Email not valid for entry.');
    }
    if(!validator.isStrongPassword(data.password)){
        throw new Error('User password not strong enough.');
    }
    if(!validator.isDate(data.dob)){
        throw new Error('User DoB not valid.');
    }
    if(!validator.isLength(data.userName, 4, 15)){
        throw new Error('Username not valid.');
    }


    validateId(data.library);




}


const validateBook = (data) => {

    console.log(data.title);
    console.log(validator.isLength(data.title));
    if(!(validator.isLength(data.title, 1, 200))){
        throw new Error('Title not valid for entry.');
    }
    if(!validator.isAlpha(data.author, 'en-US', {ignore: ' '})){
        throw new Error('Author name not valid for entry.');
    }
    if(!validator.isNumeric(data.released)||!validator.isLength(data.released, 4, 4)){
        throw new Error('Released year not valid');
    }
    if(!validator.isLength(data.description, 1, 1000)){
        throw new Error('Description not valid for entry.');
    }

}



const validateId = (data) => {

    if(data.length > 0){
        data.forEach(id => {
    
            if(!validator.isLength(id, 24)){
                throw new Error('invalid id[s]');
            }
            
        });
    }

}


const validateLibraryAddition = async (req) => {
    
    console.log(`in validatelibrary ${req.params.id}`);
    let user = await functions.getUser(req);
    console.log(user);
    let index = user.library.indexOf(req.body.bookId);
    console.log(index);
    if(index > -1){
        throw new Error('Book is already in library.');
    }
    
}


module.exports = {
    validateId,
    validateUser,
    validateLibraryAddition,
    validateBook
};