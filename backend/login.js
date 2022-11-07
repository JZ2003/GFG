const AccountsDB = require('./database/accountsDatabase.js');

function handleSignupRequest(req, res) {
  console.log("here");
  const { headers } = req;
  res.statusCode = 204;
  AccountsDB.insertDummyAccounts();
  return true;
  const created = false;
  // Todo: Post this body to the database;
  // set flag iff post succeed
  if (created) {
    res.statusCode = 204;
  } else {
    res.statusCode = 409;
  }
  return created;
}

function handleLoginRequest(url, res) {
  const queryObject = url.searchParams;
  const username = queryObject.get('user');
  const password = queryObject.get('pass');
  const canLogin = validate(username, password);
  if (canLogin) {
    res.write("success");
    res.statusCode = 200;
  } else {
    res.statusCode = 404;
  }
}

function handleCancleRequest(req, res) {
  const { header } = req;
  username = header.username;
  password = header.password;
  const deleted = false;
  //Todo: Delete account according to username.
  //Verify identity with password.
  //set 'deleted' true if delete succeed.
  if (deleted) {
    res.status(204);
  } else {
    res.status(409, {'Error': 'The user may not exist or you do not have correct authentication'});
  }
  return deleted;
}

function validate(username, password) {
  //Todo: Search through database to see if the user have authorization
  const find = AccountsDB.find(username);
  if (find === null || find === false) {
    return false;
  } else {
    return true;
  }
}

module.exports = { handleLoginRequest, handleSignupRequest, handleCancleRequest };