const fetch = require("node-fetch");
const PG = require("pg");
const moment = require('moment');

function insertClientDetails(informations_clients) {
    const orderDateMoment = moment().format('DD[-]MM[-]YYYY')
    const client = new PG.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  client.connect();
  return client.query(
    "INSERT INTO client_details (id, first_name, last_name, phone_number, order_date, order_status, client_called, order_comments, type_order) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
    [informations_clients.firstName, informations_clients.lastName, informations_clients.phoneNumber, orderDateMoment, informations_clients.orderStatus, informations_clients.clientCalled, informations_clients.comments, informations_clients.typeOrder]
  )
  .catch(error => {
    console.warn(error);
  })
}

function insertItemDetails(informations_items) {
    const client = new PG.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  client.connect();
  return client.query(
    "INSERT INTO item_details (id, product_name, product_code, product_size, product_quantity, product_origin, product_department, client_id) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7)",
    [informations_items.productName, informations_items.productCode, informations_items.productSize, informations_items.productQuantity, informations_items.productOrigin, informations_items.departmentStore, informations_items.clientId]
  )
  .catch(error => {
    console.warn(error);
  })
}

function updateClientCalled(userId, stateClientCalled){
    const client = new PG.Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true
    });
    client.connect();
    console.log(stateClientCalled);
    console.log(userId);
    return client.query(
      "UPDATE client_details SET client_called=$1 WHERE id=$2",
      [stateClientCalled, userId]
    )
    .catch(error => {
    console.warn(error);
    })
  }
  function updateOrderStatus(userId, stateOrderStatus){
      const client = new PG.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true
      });
      client.connect();
      console.log(stateOrderStatus);
      return client.query(
        "UPDATE client_details SET order_status=$1 WHERE id=$2",
        [stateOrderStatus, userId]
      )
      .catch(error => {
      console.warn(error);
      })
    }

module.exports = {
  insertClientDetails : insertClientDetails,
  insertItemDetails : insertItemDetails,
  updateClientCalled : updateClientCalled,
  updateOrderStatus : updateOrderStatus
};
