require("dotenv").config();
const { createClient } = require("@astrajs/collections");

let astraClient = null;
const getAstraClient = async () => {

  if (astraClient === null) {
    astraClient = await createClient(
      {
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
      }
    );
  }

  return astraClient;
};

const getCollection = async () => {
  const documentClient = await getAstraClient();
  
  return documentClient
    .namespace(process.env.ASTRA_DB_KEYSPACE)
    .collection("todos");
};

module.exports = { getCollection };
