const {MongoClient} = require('mongodb');
const uri = "mongodb://localhost:27017";

/** Representation of a mod */
class Mod {
    /**
     * @param {string} name of the mod
     * @param {string} author username of the mod
     * @param {string} description of the mod
     * @param {string} date of creation of the mod
     * @param {string} date of modification of the mod
     * @param {string} download link of the mod
     * @param {string} game the mod is for
     * @param {List<string>} tags of the mod
     * @param {int} number of views of the mod
     * @param {string} path to the icon image of the mod
     */
    constructor(modName, author, desc, dateCreated, dateModified, url, gameName, tag, views, icon) {
        this.modName = modName;
        this.author = author;
        this.desc = desc;
        this.dateCreated = dateCreated;
        this.dateModified = dateModified;
        this.url = url;
        this.gameName = gameName;
        this.tag = tag;
        this.views = views;
        this.icon = icon;
    }
}

/**
 * Insert the given mod into the database
 * @param {Mod} mod to be added to the database
 * @returns {boolean} false if the mod with same name already exists in the database
 */
async function insert(mod) {
    const client = new MongoClient(uri);
    let succeed = false;
    try {
        await client.connect();
        const collection = client.db("cs35lproject").collection("mods");
        // check if the mod with same name already exists
        const findResult = await collection.findOne({modName: mod.modName});
        if (findResult == null) {
            const insertResult = await collection.insertOne(mod);
            console.log("Mod inserted: " + mod.modName);
            console.log(`New mod created with the following id: ${insertResult.insertedId}`);
            succeed = true;
        } else {
            console.log("Mod already exists: " + mod.modName);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return succeed;
}

async function insertDefault() {
    let defaultMod = new Mod("Default Mod", "Default Author", "Default Description", "2022/11/01", "2022/11/01", "https://www.google.com", "Default Game", "Default Tag", 0, "Default Icon");
    insert(defaultMod);
}

/**
 * Get the mod with the given modName from the database
 * @param {string} modName of the Mod
 * @returns {Mod} Mod with the given username, null if the mod does not exist
 */
 async function find(modName) {
    const client = new MongoClient(uri);
    let mod = null;
    try {
        await client.connect();
        mod = await client.db("cs35lproject").collection("mods").findOne({modName: modName});
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    if (mod == null) {
        console.log("Mod not found: " + modName);
    } else {
        console.log("Mod found: " + mod.modName);
    }
    return mod;
}

/**
 * Remove the mod with the given modName from the database
 * @param {string} modName of the mod
 * @returns {boolean} false if the mod with the given modName does not exists
 */
 async function remove(modName) {
    const client = new MongoClient(uri);
    let succeed = false;
    try {
        await client.connect();
        const collection = client.db("cs35lproject").collection("mods");
        // check if the mod already exists
        const findResult = await collection.findOne({modName: modName});
        if (findResult != null) {
            const deleteResult = await collection.deleteOne({modName: modName});
            console.log("Mod deleted: " + modName);
            console.log(`Deleted ${deleteResult.deletedCount} mod(s)`);
            succeed = true;
        } else {
            console.log("Mod does not exist: " + username);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return succeed;
}

/**
 * Update the mod with the given modName in the database
 * @param {string} modName of the mod
 * @param {Mod} mod to be updated
 * @returns {boolean} false if the mod with the given modName does not exists
 */
async function update(modName, mod) {
    const client = new MongoClient(uri);
    let succeed = false;
    try {
        await client.connect();
        const collection = client.db("cs35lproject").collection("mods");
        // check if the mod already exists
        const findResult = await collection.findOne({modName: modName});
        if (findResult != null) {
            const updateResult = await collection.updateOne({modName: modName}, {$set: mod});
            console.log("Mod updated: " + modName);
            console.log("New mod: " + mod.modName);
            console.log(`${updateResult.matchedCount} mod(s) matched the filter, updated ${updateResult.modifiedCount} mod(s)`);
            succeed = true;
        } else {
            console.log("Mod does not exist: " + modName);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return succeed;
}


module.exports = { Mod, insert, insertDefault, find, remove, update };