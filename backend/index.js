const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const { method } = req;
    if (method === 'POST') {
        return handlePostRequest(req, res);
    } else if (method === 'GET') {
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
    url = new URL(req.url);
    if (url.pathname === '/signup') {
      const { headers } = req;
      // Todo: Post this body to the database;
      return true;
    } else {
      throw new Error(`Incorrect path for signup: ${url.pathname}`);
    }
};

const handleGetRequest = (req, res) => {
    url = new URL(req.url);
    if (url.pathname === '/login') {
      const queryObject = url.URLSearchParams;
      const username = queryObject.get(user);
      const password = queryObject.get(pass);
      return validate(username, password);
    } else {
      throw new Error(`Incorrect path for login: ${req.url.pathname}`);
    }
};

const validate = (username, password) => {
    //Todo: Search through database to see if the user have authorization
    return false;
};