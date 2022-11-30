const {MongoClient} = require('mongodb');
const uri = "mongodb://localhost:27017";
const fs = require('fs');
const dbName = 'cs35lproject';
const client = new MongoClient(uri);


async function importCollection (db, collectionName) {
    const data = fs.readFileSync('./sample/' + collectionName + '.json');
    const docs = JSON.parse(data.toString());
    try {
        const result = await db.collection(collectionName).insertMany(docs);
        console.log('Inserted docs to ' + collectionName + ' :', result.insertedCount);
    } catch(e) {
        console.error('Error inserting docs to ' + collectionName + ' :', e);
        console.error(e);
    } 
}

async function main() {
    const db = client.db(dbName);
    console.log('Connected successfully to server, starting import sample data');
    await importCollection(db, "mods");
    await importCollection(db, "accounts");
    client.close();
}

main().catch(console.error);