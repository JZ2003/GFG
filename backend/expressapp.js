const express = require("express");
const cors = require('cors');
const login = require('./login');
const upload = require('./upload')

const app = express();

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    // hello
});

app.get('/', function (req, res, next) {
    // Handle the get for this route
});

app.post('/', function (req, res, next) {
    // Handle the post for this route
    console.log('here');
});

app.post('/signup', function (req, res, next) {
    // Handle the post for this route
    console.log('signup');
    login.handleSignupRequest(req, res);
});


app.listen(3030, () => {
    console.log('Server listening on 3030');
});