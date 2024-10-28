const http = require('http');
const fs = require('fs');
const url = require('url');

// Create the HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if(parsedUrl.page === 'settings') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello, HTTP world!');
  }
  else {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.write(parsedUrl);
    res.end('Error!!!');    
  }
});

// Start the server
const PORT = 3034; // You can use any available port
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
