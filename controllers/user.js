const mongodb = require('../db/connect');
const functions = require('../functions/functions');
const validate = require('../validate/validate');

const getUser = async (req, res, next ) =>  {


        

    console.log("in getUser");
    const ObjectId = require('mongodb').ObjectId;
    const userId = new ObjectId(req.params.id);
    
    // Get the database and collection on which to run the operation
    
    
    // Execute query 
    try {

        validate.validateId(req.params);
        
        let response = await functions.getUser(req, res);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(response);

    } catch (err) {
        console.log(`findOne error--> ${err}`);
        res.status(400).send(`findOne error--> ${err}`);
    }
    
    

};


const createUser = async (req, res, next) =>  {
    
    console.log("in postRoute");


    try{

        validate.validateUser(req.body);


        // Get the database and collection on which to run the operation
        const collection = mongodb.getCollection("Users");
        await collection.insertOne(req.body).then(result => {

            if (result.acknowledged) {
                console.log(result.insertedId.toString());
                res.status(201).send(result.insertedId);
            } else {
                throw new Error('Some error occurred while creating the contact.');
            }
            
        });

    }catch(err){
        console.log(`Create user error--> ${err}`);
        res.status(500).send(`Create user error--> ${err}`);
    }
    
}


const updateUser = async (req, res, next) =>  {

    console.log("in putRoute");
    const ObjectId = require('mongodb').ObjectId;
    const userId = new ObjectId(req.params.id);


    try{

        validate.validateUser(req.body);

        // Get the database and collection on which to run the operation
        const collection = mongodb.getCollection("Users");
        
        // Execute update
        await collection.updateOne({_id: userId}, {$set: req.body}, function(err, res) {
            if (err){
                throw new Error('Could not update. Try again later.');
            } 
        });

        console.log("1 document updated--");
        res.status(204).send();
    }catch (err) {
        console.log(`User update error--> ${err}`);
        res.status(400).send(`User update error--> ${err}`);
    }

}


const deleteUser = async (req, res, next) =>  {

    const ObjectId = require('mongodb').ObjectId;
    const userId = new ObjectId(req.params.id);

    try{
        // Get the database and collection on which to run the operation
        const collection = mongodb.getCollection("Users");

        // Execute delete
        await collection.deleteOne({_id: userId}, function(err, obj) {
            if (err){
                console.log("not deleted");
                throw new Error('user not deleted');
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
    getUser,
    createUser,
    updateUser,
    deleteUser
};
