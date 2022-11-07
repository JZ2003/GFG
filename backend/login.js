const AccountsDB = require('./database/accountsDatabase.js');

function handleSignupRequest(req, res) {
  console.log("here");
  const { headers } = req;
  newUser = new AccountsDB.Account(headers.username, headers.password);
  AccountsDB.insert(newUser).then((canInsert) => {
    if (canInsert) {
      res.statusCode = 201;
      res.end();
    } else {
      res.statusCode = 409;
      res.write("Already exist");
      res.end();
    }
  });
}

function handleLoginRequest(url, res) {
  const queryObject = url.searchParams;
  const username = queryObject.get('user');
  const password = queryObject.get('pass');
  // const data = await AccountsDB.find(username);
  // if (data === null) {
  //   res.statusCode = 404;
  //   res.write("Incorrect username");
  // } else if (data.password === password) {
  //   res.statusCode = 200;
  //   res.write("Success");
  // } else {
  //   res.statuCode = 404;
  //   res.write("Failed");
  //   return false;
  // }
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
    res.stausCode = 500;
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

module.exports = { handleLoginRequest, handleSignupRequest, handleCancleRequest, handleUpdateRequest };