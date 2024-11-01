const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// Create the HTTP server
const server = http.createServer((req, res) => {
  (async() => {
  const parsedUrl = url.parse(req.url, true);
  const queryParams = parsedUrl.query;
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
const { getSettingsByGid } = require('../app/src/db_tools.js'); // Ensure the path is correct
getSettingsByGid("00000000000").then(settings => {
    res.write(`
    <script>
    console.log(${settings});
      </script>`);
}).catch(error => {
    res.write(`
    <script>
    console.log('error');
      </script>`);
});
    res.end(data); 
  })();
});

// Start the server
const PORT = 3034; // You can use any available port
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
