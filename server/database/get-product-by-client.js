const fetch = require("node-fetch");
const PG = require("pg");


function selectProductClient(clientId, callback) {
  const client = new PG.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  client.connect();
  return client
    .query(
      "SELECT id, product_name, product_code, product_size, product_origin, product_quantity, product_department FROM item_details WHERE client_id=$1",
      [clientId]
    )
    .then(res => {
      client.end();
      return res.rows;
    })
    .catch(error => {
      callback(error)
    })
}


module.exports = {
  selectProductClient : selectProductClient
}
