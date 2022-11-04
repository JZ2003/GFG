function handleSignupRequest(req, res) {
  const { headers } = req;
  const created = false;
  // Todo: Post this body to the database;
  // set flag iff post succeed
  if (created) {
    res.send(201);
  } else {
    res.send(409, {'Error': 'Username may exist'});
  }
  return created;
}

function handleLoginRequest(url, res) {
  const queryObject = url.URLSearchParams;
  const username = queryObject.get(user);
  const password = queryObject.get(pass);
  const canLogin = validate(username, password);
  if (canLogin) {
    res.send(200);
  } else {
    res.send(404, {'Error': 'Check if your username or password is correct'});
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
  return false;
}

module.exports = { handleLoginRequest, handleSignupRequest, handleCancleRequest };