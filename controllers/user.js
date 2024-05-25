const mongodb = require('../db/connect');


const getUser = async (req, res, next ) =>  {


        

    console.log("in findContactRoute");
    const ObjectId = require('mongodb').ObjectId;
    const userId = new ObjectId(req.params.id);
    
    // Get the database and collection on which to run the operation
    const database = mongodb.getDb().db("CSE341");
    const contacts = database.collection("contacts");
    
    // Execute query 
    const cursor = await contacts.find({_id: userId}).toArray().then((list) => {
        res.send(JSON.stringify(list[0]));
        console.log(JSON.stringify(list[0]));
      });

};


const createUser = async (req, res, next) =>  {
    
    console.log("in postRoute");

    var inserted = false;

    const connection = mongodb.getDb();
    // Get the database and collection on which to run the operation
    const database = mongodb.getDb().db("CSE341");
    const contacts = database.collection("contacts");
    
    // Execute insert 
    contacts.insertOne(req.body);

    
    //variables used to get the id of the recently inserted contact
    var first = req.body.firstName;
    var last = req.body.lastName;
    var email = req.body.email;
    await contacts.find({firstName: first, lastName: last, email: email}).toArray().then((list) => {
        console.log("document created");
        res.status(201).send(JSON.stringify(list[0]._id));
        console.log(JSON.stringify(list[0]._id));
    });
    


}


const updateUser = async (req, res, next) =>  {

    console.log("in putRoute");
    const ObjectId = require('mongodb').ObjectId;
    const contactId = new ObjectId(req.params.id);
        
    // Get the database and collection on which to run the operation
    const database = mongodb.getDb().db("CSE341");
    const contacts = database.collection("contacts");
    
    // Execute update
    await contacts.updateOne({_id: contactId}, {$set: req.body}, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
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
        if (err) throw err;
        console.log("1 document deleted");
        
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
