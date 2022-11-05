class Mod {
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

class Account {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

/**
 * @param {Mod} mod to be added to the database
 */
async function insertMod(client, mod) {
    const result = await client.db("main").collection("mods").insertOne(mod);
    console.log(`New mod created with the following id: ${result.insertedId}`);
    console.log("Mod inserted: " + mod.modName);
}

async function insertDefaultMod(client) {
    let defaultMod = new Mod("Default Mod", "Default Author", "Default Description", "2022/11/01", "2022/11/01", "https://www.google.com", "Default Game", "Default Tag", 0, "Default Icon");
    insertMod(client, defaultMod);
}

/**
 * @param {string} name of the mod
 * @returns {Mod} mod with the given name
 * @throws {Error} if no mod with the given name exists
 **/
async function getMod(client, modName) {
    const result = await client.db("main").collection("mods").findOne({ modName: modName });
    if (result) {
        console.log(`Found a mod in the collection with the name '${modName}':`);
        console.log(result);
    } else {
        console.log(`No mod found with the name '${modName}'`);
    }
}

module.exports = { Mod, Account, insertMod, insertDefaultMod, getMod };