const http = require('http');
const { values } = require('./values.js');

const hostname = '127.0.0.1';
const port = 3000;

const sum = (x, y) => {
  return x + y;
};

const handleRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  try {
    const result = sum(values.v1, values.v2);
    res.statusCode = 200;
    res.end(`The sum of 2 + 2 is : ${result}`);
  } catch (e) {
    res.statusCode = 500;
    res.end('Deu ruim!');
  }
};

const server = http.createServer(handleRequest);

server.on('error', (e, data) => {
  console.log('Erro is: ', e, data);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});