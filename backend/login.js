const http = require('http')

const server = http.createServer((req, res) => {
  const { method } = req;
  switch(method) {
    case 'Get':
      const handleGetRequest = (req, res) => {
        const path = req.url;
        if (pathname === '/users') {
          data = [];
          return res.end(JSON.stringify(data));
        }
      };
    default:
      throw new Error();
  }
});

server.listen(4001, () => {
    const { address, port } = server.address();
    console.log(`Server is listening on: http://${address}:${port}`);
});