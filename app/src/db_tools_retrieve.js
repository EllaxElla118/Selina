const { MongoClient } = require("mongodb");

// Replace with your MongoDB connection string
const uri = "mongodb+srv://Emma:6RynBIW4mbqEhEud@cluster0.gp8zi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function getSettingsByGid(gid) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db("GroupData");
        const collection = database.collection("settings");
        
        const query = { gid: gid };
        const document = await collection.findOne(query);

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

// Export the function correctly
module.exports = { getSettingsByGid };
