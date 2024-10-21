const http = require('http');

const server = http.createServer((req, res) => {
  // Set CORS headers to allow all origins
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specific methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

  res.setHeader('Content-Type', 'text/html');
  
  params = req.url.split('"').join('').split('/?').join('').split('=').join(': "').split('&').join('," ') + '"';
        res.writeHead(200);
        res.end(JSON.stringify(params));

});

// Start the server and listen on port 15346
const PORT = 15346;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});