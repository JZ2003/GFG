const http = require('http');
const url = require('url');
const login = require('./login');
const upload = require('./upload')

var server = http.createServer((req, res) => {
  const { method } = req;
  const baseURL = 'http://' + req.headers.host + '/';
  const url = new URL(req.url, baseURL);
  // console.log(url);
  if (method === 'POST') {
    switch (url.pathname) {
      case '/signup':
        console.log('here');
        login.handleSignupRequest(req, res);
        break;
      case '/createMod':
        upload.handleUploadReqeust(req, res);
        break;
      default:
        res.statusCode = 400;
        res.write('Unrecognize path');
        res.end();
        break;
    }
  } else if (method === 'GET') {
    switch (url.pathname) {
      case '/':
        break;
      case '/login':
        login.handleLoginRequest(req, res);
        break;
      case '/listall':
        upload.handleGetAllRequest(req, res);
        break;
      case '/currMod':
        upload.handleGetModRequest(req, res);
        break;
      case '/filterMod':
        upload.handleFilterRequest(req,res);
        break;
      case '/tagFilter':
        upload.handleFilterTagRequest(req,res);
        break;
      default:
        res.statusCode = 400;
        res.write('Unrecognize path');
        res.end();
        break;
    }
  } else if (method === 'PUT') {
    switch (url.pathname) {
      case '/updateUser':
        login.handleUpdateRequest(req, res);
        break;
      case '/updateMod':
        console.log("this way");
        upload.handleUpdateRequest(req, res);
        break;
      default:
        res.statusCode = 400;
        res.write('Unrecognize path');
        res.end();
        break;;
    }
  } else if (method === 'DELETE') {
    switch (url.pathname) {
      case '/cancelUser':
        login.handleCancleRequest(req, res);
        break;
      case '/cancelMod':
        upload.handleDeleteModRequest(req, res);
        break;
      default:
        res.statusCode = 400;
        res.write('Unrecognize path');
        res.end();
        break;
    }
  } else {
    res.statusCode = 400;
    res.write('Unrecognize method');
    res.end();
  }
})

server.listen(3030, () => {
  console.log("Service is listening to at port 3030");
});
