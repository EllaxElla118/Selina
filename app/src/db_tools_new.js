const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://Emma:6RynBIW4mbqEhEud@cluster0.gp8zi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function newSettingsByGid(gid) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db("GroupData");
        defaultSettings = {    welMsg: "Hello", leaveMsg: "Bye", antilink: false    };
        const collection = database.collection("settings");
            document = {
                gid: gid,
                settings: defaultSettings,
            };
            await collection.insertOne(document);
            return "Success";
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
}

// Export the function correctly
module.exports = { newSettingsByGid };
