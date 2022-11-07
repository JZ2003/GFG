const ModsDB = require('./database/modsDatabase.js');
const AccountsDB = require('./database/accountsDatabase.js');
function handleSignupRequest(req, res) {
  //Put some dummy accounts for test purpose
  AccountsDB.insertDummyAccounts();
  //------------------------------------
  const { headers } = req;
  const created = false;
  // // Todo: Post this body to the database;
  // // set flag iff post succeed
  // if (created) {
  //   res.send(201);
  // } else {
  //   res.send(409, {'Error': 'Username may exist'});
  // }
  res.end()
  return created;
}

function handleLoginRequest(url, res) {
  // const queryObject = url.URLSearchParams;
  const queryObject = url.searchParams; //Fixed. --zjx
  // console.log(queryObject);
  const username = queryObject.get('user'); //Should use string 'user' --zjx
  const password = queryObject.get('pass'); //Same
  // console.log(username, password);
  const canLogin = validate(username, password);
  if (canLogin) {
    // res.send(200);
    res.write(200);
  } else {
    // res.send(404, {'Error': 'Check if your username or password is correct'});
    res.end(404);
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
    res.send(204);
  } else {
    res.send(409, {'Error': 'The user may not exist or you do not have correct authentication'});
  }
  return deleted;
}

function validate(username, password) {
  //Todo: Search through database to see if the user have authorization
  let account = AccountsDB.find(username);
  if (account === null){
    return false;
  } else {
    if (account.password === password){return true;}
    else {return false;}
  }
}

module.exports = { handleLoginRequest, handleSignupRequest, handleCancleRequest };