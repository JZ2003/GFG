function handleSignupRequest(req, res) {
  const { headers } = req;
  const created = false;
  // Todo: Post this body to the database;
  // set flag iff post succeed
  res.send(201, {"result": created});
  return created;
}

function handleLoginRequest(url, res) {
  const queryObject = url.URLSearchParams;
  const username = queryObject.get(user);
  const password = queryObject.get(pass);
  const canLogin = validate(username, password);
  res.send(200, {"result": canLogin});
}

function handleCancleRequest(req, res) {
  const { header } = req;
  username = header.username;
  password = header.password;
  const deleted = false;
  //Todo: Delete account according to username.
  //Verify identity with password.
  //set 'deleted' true if delete succeed.
  res.send(204, {"result": deleted});
  return deleted;
}

function validate(username, password) {
  //Todo: Search through database to see if the user have authorization
  return false;
}

module.exports = { handleLoginRequest, handleSignupRequest, handleCancleRequest };