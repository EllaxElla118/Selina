const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const { getSettingsByGid } = require('../app/src/db_tools_retrieve.js');
const { newSettingsByGid } = require('../app/src/db_tools_new.js');

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
        const gid= ${queryParams.gId};
        const gowner= ${queryParams.gowner};
        const hashed= ${queryParams.hashed};
        const wlcMsg = '${settings.welMsg}';
        const lvMsg =  '${settings.leaveMsg}';
        const antiLink = ${settings.antilink};
      </script>`);
            res.write(data);
            res.end();
        }).catch(error => {
            newSettingsByGid(queryParams.gId);
            res.write(`
            <!DOCTYPE html>
            <html>
            <script>
            document.addEventListener("DOMContentLoaded", function() {
                location.reload();
            });
            </script>
            <body>Reloading... Please wait</body></html>`);
            res.end();
        });
    });

// Start the server
const PORT = 3034; // You can use any available port
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
