const fetch = require("node-fetch");
const PG = require("pg");

function DeleteOrderByClient(userId) {
  const client = new PG.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  client.connect();
  return client
    .query(
      "DELETE FROM client_details WHERE id=$1",
      [userId]
    )
    .then(res => {
      client.end();
      }
    )
    .catch(error => {
      console.warn(error);
    });
}

module.exports = {
  DeleteOrderByClient : DeleteOrderByClient
};
