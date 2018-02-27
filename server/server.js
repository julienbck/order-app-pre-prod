const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

const insertClientDetailsInDB = require ('./database/post_profile.js');
const fetchAllClients = require ('./database/get-client.js');
const selectProductByClient = require ('./database/get-product-by-client.js');
const deleteOrderByClient = require ('./database/delete_order.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/api/insertclientdetails", function(request, result) {
  insertClientDetailsInDB.insertClientDetails(request.body)
  .then(data => result.json(data));
});

app.post("/api/insertitemdetails", function(request, result) {
  insertClientDetailsInDB.insertItemDetails(request.body)
  .then(data => result.json(data));
});

app.post("/api/clientCalled/:userId", function(request, result) {
  console.log(request.params);
  console.log(request.body);
  insertClientDetailsInDB.updateClientCalled(request.params.userId, request.body.clientCalled)
  .then(data => result.json(data));
});

app.post("/api/orderStatus/:userId", function(request, result) {
  console.log(request.body.orderStatus);
  insertClientDetailsInDB.updateOrderStatus(request.params.userId, request.body.orderStatus)
  .then(data => result.json(data));
});

app.get("/api/fetchClients", function(request, result) {
  fetchAllClients.selectAllClients().then(event => {
    result.json(event);
  });
});

app.get("/api/orderStatusTrue", function(request, result) {
  fetchAllClients.selectAllClientsValidate().then(event => {
    result.json(event);
  });
});

app.get("/api/clientByDepartment/:departmentName", function(request, result) {
  fetchAllClients.selectAllClientsByDepartment(request.params.departmentName).then(event => {
    result.json(event);
  });
});


app.get("/api/:userId/product", function(request, result) {
  selectProductByClient.selectProductClient(request.params.userId).then(event => {
    result.json(event);
  });
});

app.delete("/api/order/:userId", function(request, result) {
  deleteOrderByClient.DeleteOrderByClient(request.params.userId)
    .then(data => result.json(data));
});
// Le appget * catch tout du coup si il est pas a la fin, tout ce qui est fait apres est ignoré.

app.get("*", function(request, result) {
  result.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, function() {
  console.log("Server listening on port:" + port);
});
