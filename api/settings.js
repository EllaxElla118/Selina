const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const { getSettingsByGid } = require('../app/src/db_tools.js'); // Ensure the path is correct

// Create the HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const queryParams = parsedUrl.query;

    // Set up the response header
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Read the HTML file
    const filePath = path.join(__dirname, '../app/src/settings/settings.html');

        // Use the gid from queryParams and call the database function
        getSettingsByGid(queryParams.gId).then(settings => {
        const data = fs.readFileSync(filePath, 'utf8');
        res.write(`<!DOCTYPE html>
    <html lang='en'>
    <head>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
          console.log(${JSON.stringify(settings)});
          document.getElementById('gid').innerHTML = ${queryParams.gId};
          document.getElementById('wlcMsg').innerHTML = ${settings.welMsg};
        });
      </script>`);
            res.write(data);
            res.end();
        }).catch(error => {
            console.error('Database error:', error);
            res.write(`<!DOCTYPE html>
            <html>
            <head>
                <title>Error</title>
            </head>
            <body>
                <script>
                console.log('Error retrieving settings');
                </script>
                <div>Could not retrieve settings.</div>
            </body>
            </html>`);
            res.end();
        });
    });

// Start the server
const PORT = 3034; // You can use any available port
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
