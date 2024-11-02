const http = require('http');
var crypto = require('crypto');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const queryParams = parsedUrl.query;

    // Set up the response header
    res.writeHead(200, { 'Content-Type': 'text/html' });

  var mykey = crypto.createDecipher('aes-128-cbc', process.env.cipher);
  var mystr = mykey.update(queryParams.hashed, 'hex', 'utf8')
  mystr += mykey.final('utf8');
  if(mystr === queryParams.otp_in) {
    await upd();
    res.write(`Saved Successfully`);
  } else {
    res.write(`Wrong OTP Code. Restart the process by typing /settings in the group chat`);
  }  
    res.end();
};
                                 
// Start the server
const PORT = 3027; // You can use any available port
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://<username>:<password>@cluster1.mongodb.net/group?retryWrites=true&w=majority";

async function upd(document) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db("GroupData"); // Database name
        const collection = database.collection("settings"); // Replace with your collection name

        // Use updateOne with upsert to replace an existing document or insert a new one
        const result = await collection.updateOne(
            { gid: document.gid },        // Filter by gid
            { $set: document },           // Set the document data (replace if it exists)
            { upsert: true }              // Insert if it doesn't exist
        );

        if (result.upsertedCount > 0) {
            console.log("New document inserted with _id:", result.upsertedId);
        } else {
            console.log("Existing document updated with gid:", document.gid);
        }
    } catch (error) {
        console.error("Error saving or updating document:", error);
    } finally {
        await client.close();
    }
}

// Example document
const document = {
    gid: queryParams.gid,
    settings: {
        welMsg: queryParams.wlcMsg,
        leaveMsg: queryParams.lvMsg,
        antilink: JSON.parse(queryParams.antiLink)
    }
};
