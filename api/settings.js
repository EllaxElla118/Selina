const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// Create the HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const queryParams = parsedUrl.query;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const filePath = path.join(__dirname, 'settings.html');
    const data = fs.readFileSync(filePath, 'utf8');
    res.write(`<!DOCTYPE html>
    <html>
    <script>
    document.addEventListener("DOMContentLoaded", function() {
      document.getElementById('gid').innerHTML = ${queryParams.gId}
      });
      </script>`);
    res.end(data);   
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Emma:6RynBIW4mbqEhEud@cluster0.gp8zi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Access the GroupData collection
    const database = client.db("yourDatabaseName"); // Replace with your actual database name
    const collection = database.collection("GroupData");

    // Find the document with gid value 475788 and retrieve the settings field
    const gidValue = 00000000000;
    const document = await collection.findOne({ gid: gidValue }, { projection: { settings: 1, _id: 0 } });

    if (document) {
      console.log("Settings for gid 00000000000:", document.settings);
    } else {
      console.log("No document found with gid:", gidValue);
    }

  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}

// Start the server
const PORT = 3034; // You can use any available port
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
