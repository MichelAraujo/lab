const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const read = () => {
  fs.readFile('./test.txt', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
};

const handleRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  try {
    read();
    res.statusCode = 200;
    res.end('Hello Gophers!!');
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