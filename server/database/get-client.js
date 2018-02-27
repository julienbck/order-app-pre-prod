const fetch = require("node-fetch");
const PG = require("pg");


function selectAllClients() {
  const client = new PG.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  client.connect();
  return client
    .query(
      "SELECT id, first_name, last_name, phone_number, order_date, order_status, order_comments, client_called, type_order  FROM client_details ORDER BY order_date DESC"
    )
    .then(res => {
      client.end();
      return res.rows;
    })
    .catch(error => {
      console.warn(error);
    })
}

function selectAllClientsValidate() {
  const client = new PG.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  client.connect();
  return client
    .query(
      "SELECT id, first_name, last_name, phone_number, order_date, order_status, order_comments, client_called  FROM client_details WHERE order_status='TRUE' ORDER BY order_date DESC"
    )
    .then(res => {
      client.end();
      return res.rows;
    })
    .catch(error => {
      console.warn(error);
    })
}

function selectAllClientsByDepartment(departmentName) {
  const client = new PG.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  client.connect();
  return client
    .query(
      "SELECT client_details.id, client_details.first_name, client_details.last_name, client_details.phone_number, client_details.order_date, client_details.order_status, client_details.order_comments, client_details.client_called, client_details.type_order, item_details.product_department  FROM client_details LEFT JOIN item_details ON client_details.id=item_details.client_id WHERE item_details.product_department=$1 GROUP BY item_details.product_department, client_details.id",
      [departmentName]
    )
    .then(res => {
      client.end();
      return res.rows;
    })
    .catch(error => {
      console.warn(error);
    })
}

module.exports = {
  selectAllClients:selectAllClients,
  selectAllClientsValidate: selectAllClientsValidate,
  selectAllClientsByDepartment : selectAllClientsByDepartment
}
