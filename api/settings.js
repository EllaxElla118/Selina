const http = require('http');
const fs = require('fs');
const url = require('url');

// Create the HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const data = fs.readFileSync('../app/src/settings/settings.html', 'utf8');
    console.log(data);
    res.end(data);
});

// Start the server
const PORT = 3034; // You can use any available port
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
