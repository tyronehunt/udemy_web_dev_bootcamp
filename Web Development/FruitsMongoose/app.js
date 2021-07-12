// Require Mongoose and connect
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});

// SINGLE INSERT DOCUMENTS
// Create schema (including validation on data type if required)
const fruitSchema = new mongoose.Schema({
  name: {type: String, required: [true, "you need to specify a name"]},
  rating: {type: Number, min: 1, max: 10},
  review: String
});

// Use schema to create a model (first parameter is collection with singular name, 2nd is structure of schema)
const Fruit = mongoose.model("Fruit",  fruitSchema);

// Create instance (document) from  the Fruit Schema
const apple = new Fruit ({
  name: "Apple",
  rating: 3,
  review: "Pretty solid as a fruit"
});

// Save fruit document inside Fruit collection inside fruitsDB
apple.save()

// Create a person Schema (note the embedded relationship to the Fruits collection)
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema,
});

// Create model for person Schema
const Person = mongoose.model("Person",  personSchema);

// Create a new person document
const person = new Person ({
  name: "John",
  age: 35
});

person.save()

// RELATIONSHIPS BETWEEN DOCUMENTS IN MONGOOSE
const person2 = new Person({ name: "Amy", age: 12, favouriteFruit: apple});
person2.save()

// BULK INSERT DOCUMENTS (to fruits collection )
const kiwi = new Fruit ({
  name: "kiwi",
  rating: 10,
  review: "excellent!"
})
const banana = new Fruit ({
  name: "banana",
  rating: 5,
  review: "goes ripe too quickly"
})

Fruit.insertMany([kiwi, banana], function(err){
  if (err){
  console.log(err);
  } else {
  console.log("successfully logged all fruits to fruitsDB");
  }
});


// UPDATING DATA
Fruit.updateOne({_id: "60ec41eae9e4310ab9867745"}, {name: "Peach"}, function(err){
if (err) {
console.log(err);
} else {
console.log("Success");}
})


// DELETING DATA
Fruit.deleteOne({name: "Peach"}, function(err){
if (err) {
console.log(err);
} else {
console.log("Deleted");}
})

Person.deleteMany({name: "John"}, function(err){
if (err) {
console.log(err);
} else {
console.log("Deleted all the documents");}
})


// FIND IN (fruits) COLLECTIONS
Fruit.find(function(err, fruits){
  if (err){
  console.log(err);
  } else {
    console.log(fruits);

    // To return just the name from the array of documents
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });

    // Close mongoose connection once everything has been completed
    mongoose.connection.close()
  }
});
