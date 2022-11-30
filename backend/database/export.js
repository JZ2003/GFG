const {MongoClient} = require('mongodb');
const uri = "mongodb://localhost:27017";
const fs = require('fs');
const dbName = 'cs35lproject';
const client = new MongoClient(uri);

async function main() {
    console.log('Connected successfully to server, starting export sample data');
    const db = client.db(dbName);

    getDocuments(db, function(docs, collectionName) {
    
        console.log('Closing connection.');
        client.close();
        
        // Write to file
        try {
            fs.writeFileSync('./sample/' + collectionName + '.json', JSON.stringify(docs));
            console.log('Done writing to file.');
        }
        catch(err) {
            console.log('Error writing to file', err)
        }
    });
}

async function getDocuments(db, callback) {
    const query = { };  // this is your query criteria
    db.collection("mods")
      .find(query)
      .toArray(function(err, result) { 
          if (err) throw err; 
          callback(result, "mods"); 
    });
    db.collection("accounts")
      .find(query)
      .toArray(function(err, result) { 
          if (err) throw err; 
          callback(result, "accounts"); 
    });
};

main().catch(console.error);