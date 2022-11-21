const AccountsDB = require('./database/accountsDatabase.js');

/**
 * Initialize the database with a bunch of dummy accounts
 */
function handleinsertDummyUsers(req, res) {
  AccountsDB.insertDummyAccounts().then((success) => {
    if (success) {
      res.statusCode = 204;
      res.end();
    } else {
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
      res.statusCode = 200;
      res.end();
    } else {
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
      res.statusCode = 201;
      res.end();
    } else {
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
      res.statusCode = 404;
      res.write("Incorrect username");
      res.end("!");
    } else if (data.password === password) {
      res.statusCode = 200;
      res.write("Success");
      res.end("!")
    } else {
      res.statusCode = 404;
      res.write("Failed");
      res.end("!")
    }
  }, () => {
    //console.log(find);
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
      res.statusCode = 404;
      res.write("Account does not exist");
      res.end();
    } else if (account.password !== password) {
      res.statusCode = 409;
      res.write("Incorrect password");
      res.end();
    } else {
      AccountsDB.remove(username).then(() => {
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
      res.statusCode = 204;
      res.end();
    } else {
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
  AccountsDB.find(username).then((account) => {
    if (account !== null) {
      res.statusCode = 200;
      res.json({"Favorite": account.favoriteModNames});
      res.end();
    } else {
      res.statusCode = 409;
      res.end("Failed with some reasons")
    }
  })
}

module.exports = { handleLoginRequest, handleSignupRequest, handleCancleRequest, handleUpdateRequest, handleinsertDummyUsers, handleremoveAllUsers,
 handleFavoriteRequest, getAllUsers, handleGetAllFavoriteRequest };