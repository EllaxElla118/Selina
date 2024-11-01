const { MongoClient } = require("mongodb");

// Replace with your MongoDB connection string
const uri = "mongodb+srv://Emma:6RynBIW4mbqEhEud@cluster1.mongodb.net/group?retryWrites=true&w=majority";

async function getSettings(gid) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to MongoDB
        await client.connect();
        
        // Specify the database and collection
        const database = client.db("GroupData");
        const collection = database.collection("settings");

        // Find the document with the specified gid
        const query = { gid: gid };
        const document = await collection.findOne(query);

        // Get the settings value if the document exists
        if (document) {
            console.log("Settings:", document.settings);
            return document.settings;
        } else {
            console.log("Document not found");
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
}

// Export the function as a module
module.exports = { getSettings };
