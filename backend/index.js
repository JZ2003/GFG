const http = require('http');
const url = require('url');
const login = require('./login');

var server = http.createServer((req, res) => {
  const { method } = req;
  const url = new URL(req.url);

  if (method === 'POST') {
    switch (url.pathname) {
      case 'signup':
        return login.handleSignupRequest(req, res);
      default:
        //res.send(400, 'Unrecognize path');
        break;
    }
  } else if (method === 'GET') {
    switch (url.pathname) {
      case 'login':
        return login.handleLoginRequest(url, res);
      default:
        //res.send(400, 'Unrecognize path');
        break;
    }
  } else if (method === 'PUT') {
    switch (url.pathname) {
      default:
        //res.send(400, 'Unrecognize path');
        break;;
    }
  } else if (method === 'DELETE') {
    switch (url.pathname) {
      case 'cancle':
        return login.handleCancleRequest(req, res);
      default:
        //res.send(400, 'Unrecognize path');
        break;
    }
  } else {
    // res.send(400, 'Unrecognize method');
  }
  res.end('Hello World');
})

server.listen(3030);
