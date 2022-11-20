const http = require('http');
const url = require('url');
const cors = require('cors');
const login = require('./login');
const upload = require('./upload');
const express = require('express');
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

const app = express();

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    // hello
});

app.post('/createMod', (req, res) => {
  console.log('Upload');
  upload.handleUploadReqeust(req, res);
})
// app.get('/', function (req, res, next) {
//     // Handle the get for this route
// });

// app.post('/', function (req, res, next) {
//     // Handle the post for this route
//     console.log('here');
// });

app.post('/signup', (req, res) => {
    // Handle the post for this route
    console.log('signup');
    login.handleSignupRequest(req, res);
});

app.get('/login', (req, res) => {
  login.handleLoginRequest(req, res);
})

app.get('/listall', (req, res) => {
  upload.handleGetAllRequest(req, res);
})

app.get('/currMod', (req, res) => {
  upload.handleGetModRequest(req, res);
})

app.get('/filterMod', (req, res) => {
  upload.handleFilterRequest(req, res);
})

app.get('/tagFilter', (req, res) => {
  upload.handleFilterTagRequest(req, res);
})

app.get('/allTag', (req, res) => {
  upload.handleGetAllTag(req, res);
})

app.put('/updateUser', (req, res) => {
  login.handleUpdateRequest(req, res);
})

app.put('/updateMod', (req, res) => {
  upload.handleUpdateRequest(req, res);
})

app.put('/updateView', (req, res) => {
  upload.handleUpdateView(req, res);
})

app.delete('/cancelUser', (req, res) => {
  login.handleCancleRequest(req, res);
})

app.delete('/cancelMod', (req, res) => {
  upload.handleDeleteModRequest(req, res);
})

app.delete('/cancelAllMods', (req, res) => {
  upload.handleRemoveAllRequest(req, res);
})

app.listen(3030, () => {
    console.log('Server listening on 3030');
});

// var server = http.createServer((req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', "*");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, FETCH, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', '*');
// //   // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// // //   // console.log(req);  
//   const { method } = req;
//   const baseURL = 'http://' + req.headers.host + '/';
//   const url = new URL(req.url, baseURL);
//   // console.log(url);
//   if (method === 'POST') {
//     console.log(url.pathname);
//     switch (url.pathname) {
//       case '/signup':
//         console.log('here');
//         login.handleSignupRequest(req, res);
//         break;
//       case '/createMod':
//         upload.handleUploadReqeust(req, res);
//         break;
//       default:
//         res.statusCode = 400;
//         res.write('Unrecognize path');
//         res.end();
//         break;
//     }
//   } else if (method === 'GET') {
//     switch (url.pathname) {
//       case '/':
//         break;
//       case '/login':
//         login.handleLoginRequest(req, res);
//         break;
//       case '/listall':
//         upload.handleGetAllRequest(req, res);
//         break;
//       case '/currMod':
//         upload.handleGetModRequest(req, res);
//         break;
//       case '/filterMod':
//         upload.handleFilterRequest(req,res);
//         break;
//       case '/tagFilter':
//         upload.handleFilterTagRequest(req,res);
//         break;
//       default:
//         res.statusCode = 400;
//         res.write('Unrecognize path');
//         res.end();
//         break;
//     }
//   } else if (method === 'PUT') {
//     switch (url.pathname) {
//       case '/updateUser':
//         login.handleUpdateRequest(req, res);
//         break;
//       case '/updateMod':
//         console.log("this way");
//         upload.handleUpdateRequest(req, res);
//         break;
//       default:
//         res.statusCode = 400;
//         res.write('Unrecognize path');
//         res.end();
//         break;;
//     }
//   } else if (method === 'DELETE') {
//     switch (url.pathname) {
//       case '/cancelUser':
//         login.handleCancleRequest(req, res);
//         break;
//       case '/cancelMod':
//         upload.handleDeleteModRequest(req, res);
//         break;
//       case '/cancleAllMod':
//         upload.handleRemoveAllRequest(req, res);
//         break;
//       default:
//         res.statusCode = 400;
//         res.write('Unrecognize path');
//         res.end();
//         break;
//     }
//   } else if (method == 'OPTIONS') {
//     // 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token, username, password'
//     res.statusCode = 200;
//     res.end();
//   } else {
//     res.statusCode = 400;
//     res.write('Unrecognize method');
//     res.end();
//   }
// })

// server.listen(3030, () => {
//   console.log("Service is listening to at port 3030");
// });
