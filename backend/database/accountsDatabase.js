const {MongoClient} = require('mongodb');
const uri = "mongodb://localhost:27017";

/** Representation of an account */
class Account {
    /**
     * @param {string} username 
     * @param {string} password 
     */
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

/**
 * Insert the given account into the database
 * @param {Account} account to be added to the database
 * @returns {boolean} false if the account with same username already exists in the database
 */
 async function insert(account) {
    const client = new MongoClient(uri);
    let succeed = false;
    try {
        await client.connect();
        const collection = client.db("cs35lproject").collection("accounts");
        // check if the account already exists
        const findResult = await collection.findOne({username: account.username});
        if (findResult == null) {
            const insertResult = await collection.insertOne(account);
            console.log("Account inserted: " + account.username);
            console.log(`New account created with the following id: ${insertResult.insertedId}`);
            succeed = true;
        } else {
            console.log("Account already exists: " + account.username);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return succeed;
}

/**
 * Find the account with the given username
 * @param {string} username of the account
 * @returns {Account} account with the given username, null if the account does not exist
 */
async function find(username) {
    const client = new MongoClient(uri);
    let account = null;
    try {
        await client.connect();
        account = await client.db("cs35lproject").collection("accounts").findOne({username: username});
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    if (account == null) {
        console.log("Account not found: " + username);
    } else {
        console.log("Account found: " + account.username);
    }
    return account;
}

/**
 * Remove the account with the given username from the database
 * @param {string} username of the account
 * @returns {boolean} false if the account with the given username does not exists
 */
async function remove(username) {
    const client = new MongoClient(uri);
    let succeed = false;
    try {
        await client.connect();
        const collection = client.db("cs35lproject").collection("accounts");
        // check if the account already exists
        const findResult = await collection.findOne({username: username});
        if (findResult != null) {
            const deleteResult = await collection.deleteOne({username: username});
            console.log("Account deleted: " + username);
            console.log(`Deleted ${deleteResult.deletedCount} account(s)`);
            succeed = true;
        } else {
            console.log("Account does not exist: " + username);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return succeed;
}

/**
 * Update the account with the given username given the old username and password
 * @param {string} old username of the account
 * @param {string} old password of the account
 * @param {string} new username of the account
 * @param {string} new password of the account
 * @returns {boolean} false if the account with the given old username does not exists 
 * or the old username and old password does not match
 */
async function update(oldUsername, oldPassword, newUsername, newPassword) {
    const client = new MongoClient(uri);
    let succeed = false;
    try {
        await client.connect();
        const collection = client.db("cs35lproject").collection("accounts");
        // check if the account already exists
        const findResult = await collection.findOne({username: oldUsername});
        if (findResult != null) {
            if (findResult.password == oldPassword) {
                const updateResult = await collection.updateOne({username: oldUsername}, {$set: {username: newUsername, password: newPassword}});
                console.log("Account updated: " + oldUsername);
                console.log("New username: " + newUsername);
                console.log("New password: " + newPassword);
                console.log(`Updated ${updateResult.modifiedCount} account(s)`);
                succeed = true;
            } else {
                console.log("Password does not match: " + oldUsername);
            }
        } else {
            console.log("Account does not exist: " + oldUsername);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return succeed;
}



module.exports = {Account, insert, find, remove, update};