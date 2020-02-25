const fs = require("fs");
const http = require("http");

const filename = "./requests.json";

const readRequests = () => {
  try {
    return fs.readFileSync(filename);
  } catch (e) {
    return "[]";
  } 
};

const writeRequest = req => {
  const requests = JSON.parse(readRequests());
  requests.push({
    url: req.url,
    date: new Date(),
  });
  fs.writeFileSync(filename, JSON.stringify(requests));
}

const server = http.createServer((req, res) => {
  writeRequest(req);
  res.end(readRequests());
});

server.listen(3000);
console.log("Server listening to port 3000");
