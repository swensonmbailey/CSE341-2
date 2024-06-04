const mongodb = require('../db/connect');
const functions = require('../functions/functions');

const getUser = async (req, res, next ) =>  {


        

    console.log("in getUser");
    const ObjectId = require('mongodb').ObjectId;
    const userId = new ObjectId(req.params.id);
    
    // Get the database and collection on which to run the operation
    
    
    // Execute query 
    try {
        
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


    
    // Get the database and collection on which to run the operation
    const database = mongodb.getDb().db("Project2");
    const collection = database.collection("Users");
    await collection.insertOne(req.body).then(result => {

        if (result.acknowledged) {
            console.log(result.insertedId.toString());
            res.status(201).send(result.insertedId);
          } else {
            res.status(500).json(result.error || 'Some error occurred while creating the contact.');
        }
        
    });
}


const updateUser = async (req, res, next) =>  {

    console.log("in putRoute");
    const ObjectId = require('mongodb').ObjectId;
    const contactId = new ObjectId(req.params.id);
        
    // Get the database and collection on which to run the operation
    const database = mongodb.getDb().db("Project2");
    const collection = database.collection("Users");
    
    // Execute update
    await collection.updateOne({_id: contactId}, {$set: req.body}, function(err, res) {
        if (err){
            console.log("not updated");
            res.status(500).send(`${err}`);
        } 
    });

    console.log("1 document updated--");
    res.status(204).send();

}


const deleteUser = async (req, res, next) =>  {

    const ObjectId = require('mongodb').ObjectId;
    const contactId = new ObjectId(req.params.id);
        
    // Get the database and collection on which to run the operation
    const database = mongodb.getDb().db("CSE341");
    const contacts = database.collection("contacts");

    // Execute delete
    await contacts.deleteOne({_id: contactId}, function(err, obj) {
        if (err){
            console.log("not deleted");
            res.status(500).send(`${err}`);
        }
        
    });

    console.log("1 document deleted--");
    res.status(200).send();

}


module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
};
