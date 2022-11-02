const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const { method } = req;
    if (method == 'POST') {
        return handlePostRequest(req, res);
    } else if (method == 'GET') {
        return handleGetRequest(req, res);
    } else {
        throw new Error(`Unspported method: ${method}`);
    }
});

server.listen(8080, () => {
    const { port } = server.address();
    console.log(`Server is listening on: http://localhost:${port}`)
});

const handlePostRequest = (req, res) => {
    const body = res.body;
    // Todo: Post this body to the database;
};

const handleGetRequest = (req, res) => {
    const queryObject =  url.parse(req.url, true).query;
    const username = queryObject.user;
    const password = queryObject.pass;
    return validate(username, password);
};

const validate = (username, password) => {
    //Todo: Search through database to see if the user have authorization
    return false;
};