var validator = require('validator');
const mongodb = require('../db/connect');
const functions = require('../functions/functions');


const userRules = {
    "firstName":"string",
    "lastName":"string",
    "email":"email",
    "password":"string|min:5",
    "subscribed": 'string',
    // "userName":"required|string",
    // // "library": 'required|array',
    // // "dob":"date"
}

const idRules = {
    "id": 'numeric|between:24,24',
    "bookId": 'numeric|between:24,24'
}

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

const validateId = (data) => {

    if(data.length > 0){
        data.forEach(id => {
    
            if(!validator.isLength(id, 24)){
                throw new Error('invalid id[s]');
            }
            
        });
    }

}


const validateLibraryAddition = async (data) => {
    
    console.log('in validatelibrary');
    console.log(data);
    let user = await functions.getUser(data.id);
    console.log(user);
    let index = user.library.indexOf(data.bookId);
    if(index == -1){
        throw new Error('Book is already in library.');
    }
    
}


module.exports = {
    validateId,
    validateUser,
    validateLibraryAddition
};