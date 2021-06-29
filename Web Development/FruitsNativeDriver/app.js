// BOILER PLATE CODE FROM https://docs.mongodb.com/drivers/node/current/quick-start/
const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string, i.e. localhost
const uri =
  "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db('fruitsDB');
    const fruits = database.collection('fruits');

    // INSERT MODULE // This will insert every time app is run!
    Create array of documents to insert
    const docs = [
      { name: "Orange", qty: 5, review: "very tangy!"},
      { name: "Banana", qty: 10, review: "goes off too quickly." },
      { name: "Strawberry", qty: 3, review: "pockets of joy."}
    ];
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await fruits.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);

    // FIND MODULE // FIND MULTIPLE ITEMS
    // Query for items with less than 6 quantity
    const query = { qty: { $lt: 6 } };
    const f_options = {
      // sort matched documents in descending order by quantity
      sort: { qty: -1 },
      // Include only the `name` and `qty` fields in the returned document
      projection: { _id: 0, name: 1, qty: 1 },
    };
    const cursor = fruits.find(query, f_options);

    // print a message if no documents were found
     if ((await cursor.count()) === 0) {
       console.log("No documents found!");
     }

     // replace console.dir with your callback to access individual elements
     await cursor.forEach(console.dir);

  // CLOSE CLIENT
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
