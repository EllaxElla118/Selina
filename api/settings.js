const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const getSettings = require('../app/src/db_tools.js');

// Create the HTTP server
const server = http.createServer((req, res) => {
  (async() => {
  const parsedUrl = url.parse(req.url, true);
  const queryParams = parsedUrl.query;
    console.log(getSettings(queryParams.gId));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const filePath = path.join(__dirname, '../app/src/settings/settings.html');
    const data = fs.readFileSync(filePath, 'utf8');
    res.write(`<!DOCTYPE html>
    <html>
    <script>
    document.addEventListener("DOMContentLoaded", function() {
      document.getElementById('gid').innerHTML = ${queryParams.gId}
      });
      </script>`);
    res.end(data); 
  })();
});

// Start the server
const PORT = 3034; // You can use any available port
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
