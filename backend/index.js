const http = require('http');
const url = require('url');
const login = require('./login');
const upload = require('./upload')
// var express = require('express')
// var app = express()

// app.get('/signup', (req, res) => {
//   // req.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   // console.log(req);
// });

// var port = process.env.PORT || '3030'
// app.listen(port, err => {
// 	if (err)
// 		throw err
// 	console.log('Server listening on port', port)
// })

var server = http.createServer((req, res) => {

//   res.setHeader('Access-Control-Allow-Origin', "*");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, FETCH, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token, user, pass');
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// //   // console.log(req);  
  const { method } = req;
  const baseURL = 'http://' + req.headers.host + '/';
  const url = new URL(req.url, baseURL);
  // console.log(url);
  if (method === 'POST') {
    console.log(url.pathname);
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
      case '/cancleAllMod':
        upload.handleRemoveAllRequest(req, res);
        break;
      default:
        res.statusCode = 400;
        res.write('Unrecognize path');
        res.end();
        break;
    }
  } else if (method == 'OPTIONS') {
    res.statusCode = 200;
    res.end();
  } else {
    res.statusCode = 400;
    res.write('Unrecognize method');
    res.end();
  }
})

server.listen(3030, () => {
  console.log("Service is listening to at port 3030");
});
