const AccountsDB = require('./database/accountsDatabase.js');
const ModsDB = require('./database/modsDatabase')
const { getLogger } = require('./logUtil.js');
const logger = getLogger('AccountsAPI');

/**
 * Initialize the database with a bunch of dummy accounts
 */
function handleinsertDummyUsers(req, res) {
  AccountsDB.insertDummyAccounts().then((success) => {
    if (success) {
      logger.info("Succedded to handle insert dummy accounts");
      res.statusCode = 204;
      res.end();
    } else {
      logger.warn("Failed to handle insert dummy accounts");
      res.statusCode = 409;
      res.end("Datebase non empty");
    }
  })
}

/**
 * This stripped out all the outdate data
 * use this before insert dummies
 */
function handleremoveAllUsers(req, res) {
  AccountsDB.removeAll().then(() => {
    logger.info("Succedded to handle remove all accounts");
    res.statusCode = 204;
    res.end();
  })
}

/**
 * For testing purposes
 */
function getAllUsers(req, res) {
  AccountsDB.search({}).then((data) => {
    if (data.length === 0){
      logger.info("No users found");
      res.statusCode = 200;
      res.end();
    } else {
      logger.info("Found users");
      res.statusCode = 200;
      res.json({"Users":data});
      res.end();
    }
  })
}

function copyUser(user) {
  let newUser = new AccountsDB.Account(user.username, user.password)
  newUser.favoriteModNames = user.favoriteModNames;
  return newUser;
}

function handleSignupRequest(req, res) {
  const { headers } = req;
  newUser = new AccountsDB.Account(headers.username, headers.password);
  AccountsDB.insert(newUser).then((canInsert) => {
    if (canInsert) {
      logger.info("Succedded to handle signup request");
      res.statusCode = 201;
      res.end();
    } else {
      logger.warn("Failed to handle signup request");
      res.statusCode = 409;
      res.end();
    }
  });
}

function handleLoginRequest(req, res) {
  const baseURL = 'http://' + req.headers.host + '/';
  const url = new URL(req.url, baseURL);
  const queryObject = url.searchParams;
  const username = queryObject.get('user');
  const password = queryObject.get('pass');

  AccountsDB.find(username).then((data) => {
    if (data === null) {
      logger.warn("Failed to handle login request: User not found");
      res.statusCode = 404;
      res.write("Incorrect username");
      res.end("!");
    } else if (data.password === password) {
      logger.info("Succeeded to handle login request: User found");
      res.statusCode = 200;
      res.write("Success");
      res.end("!")
    } else {
      logger.warn("Failed to handle login request: User found but password incorrect");
      res.statusCode = 404;
      res.write("Failed");
      res.end("!")
    }
  }, () => {
    logger.warn("Failed to handle login request: User not found due to server error");
    res.write("Server Error");
    res.end("!")
    res.statusCode = 500;
  });
}

function handleCancleRequest(req, res) {
  const { headers } = req;
  username = headers.username;
  password = headers.password;
  AccountsDB.find(username).then((account) => {
    if (account === null) {
      logger.warn("User not found");
      res.statusCode = 404;
      res.write("Failed to handle cancel request: Account does not exist");
      res.end();
    } else if (account.password !== password) {
      res.statusCode = 409;
      res.write("Failed to handle cancel request: Incorrect password");
      res.end();
    } else {
      AccountsDB.remove(username).then(() => {
        logger.info("Succedded to handle cancel request");
        res.statusCode = 204;
        res.end();
      });
    }
  });
}

function handleUpdateRequest(req, res) {
  const { headers } = req;
  oldusername = headers.oldname;
  oldpassword = headers.oldpass;
  newpassword = headers.newpass;
  AccountsDB.update(oldusername, oldpassword, newpassword).then((canupdate) => {
    if (canupdate) {
      logger.info("Succedded to handle update request");
      res.statusCode = 204;
      res.end();
    } else {
      logger.warn("Failed to handle update request");
      res.statusCode = 409;
      res.write("User not exist or password incorrect.");
      res.end();
    }
  });
}

/**
 * Usage:
 * 
 * Method: PUT
 * 
 * headers: username: data, modname: data
 */
function handleFavoriteRequest(req, res) {
  username = req.headers.username;
  modname = req.headers.modname;
  AccountsDB.find(username).then((account) => {
    newUser = copyUser(account);
    success = newUser.addFavoriteMod(modname);
    if (success) {
      AccountsDB.remove(username).then(() => {
        AccountsDB.insert(newUser).then(() => {
          res.statusCode = 200;
          res.end();
        })
      })
    } else {
      res.statusCode = 409;
      res.end();
    }
  })
}

/**
 * Usage:
 * 
 * Method: GET
 * 
 * headers: username: data
 */
function handleGetAllFavoriteRequest(req, res) {
  username = req.headers.username;
  AccountsDB.find(username).then(async (account) => {
    if (account !== null) {
      logger.info("Succedded to handle get all favorite request");
      res.statusCode = 200;
      let mods = []
      for (let i = 0; i < account.favoriteModNames.length; i++) {
        await promiseAction(account.favoriteModNames[i], mods);
      }
      console.log(mods);
      res.json({"Favorite": mods});
      res.end();
    } else {
      logger.warn("Failed to handle get all favorite request");
      res.statusCode = 409;
      res.end("Failed with some reasons")
    }
  })
}

async function promiseAction(modName, mods) {
  mods.push(await ModsDB.find(modName));
}

module.exports = { handleLoginRequest, handleSignupRequest, handleCancleRequest, handleUpdateRequest, handleinsertDummyUsers, handleremoveAllUsers,
 handleFavoriteRequest, getAllUsers, handleGetAllFavoriteRequest };