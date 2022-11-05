const mod = require('./mod');

/**
 * @param {Mod} mod to be added to the database
 */
function insertMod(mod) {
    client.connect();
    const database = client.db("mydb");
    const collection = database.collection("mods");
    collection.insertOne(mod);
    console.log("Mod inserted: " + mod.mod_name);
    client.close();
}

function insertDefaultMod() {
    let newMod = new mod.Mod("Default Mod", "Default Author", "Default Description", "2022/11/01", "2022/11/01", "https://www.google.com", "Default Game", "Default Tag", 0, "Default Icon");
    insertMod(newMod);
}

/**
 * @param {string} name of the mod
 * @returns {Mod} mod with the given name
 * @throws {Error} if no mod with the given name exists
 **/
function getMod(mod_name) {
    try {
        client.connect();
        const database = client.db("mydb");
        const collection = database.collection("mods");
        const mod = collection.findOne({mod_name: mod_name});
        return mod;
    } finally {
        console.log("Client closed");
        client.close();
    }
    
}

module.exports = { insertMod, insertDefaultMod, getMod };