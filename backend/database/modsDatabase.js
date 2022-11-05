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
 * @param {Mod} mod to be added to the database
 * @returns {boolean} false if the mod with same name already exists in the database
 */
async function insertMod(mod) {
    const client = new MongoClient(uri);
    let succeed = false;
    try {
        await client.connect();
        const result = await client.db("cs35lproject").collection("mods").insertOne(mod);
        console.log(`New mod created with the following id: ${result.insertedId}`);
        console.log("Mod inserted: " + mod.modName);
        succeed = true; //Todo: return false if the mod already exists
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return succeed;
}

async function insertDefaultMod() {
    let defaultMod = new Mod("Default Mod", "Default Author", "Default Description", "2022/11/01", "2022/11/01", "https://www.google.com", "Default Game", "Default Tag", 0, "Default Icon");
    insertMod(defaultMod);
}

/**
 * @param {string} name of the mod
 * @returns {Mod} mod with the given name
 * @returns {boolean} false if no mod with the given name exists
 **/
async function getMod(modName) {
    const client = new MongoClient(uri);
    let succeed = false;
    try {
        await client.connect();
        const result = await client.db("cs35lproject").collection("mods").findOne({ modName: modName });
        if (result) {
            console.log(`Found a mod in the collection with the name '${modName}':`);
            console.log(result);
            succeed = true;
        } else {
            console.log(`No mod found with the name '${modName}'`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return succeed;
}

module.exports = { Mod, insertMod, insertDefaultMod, getMod };