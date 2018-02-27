import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import App from './App';
import history from './history.js';
import Home from './utils/Home.js';
import ProductForm from './utils/productForm.js';
import Validation from './utils/validateForm.js';
import AddOrder from  './utils/addOrder.js';
import OrderClient from './utils/OrderClient.js';
import OrderByDepartment from './utils/orderByDepartment.js';
import OrderStatusTrue from './utils/orderStatusTrue.js';

const Routes = () => (
  <Router history={history} component={Home} >
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/home" component={Home} />
      <Route path="/addorder" component={AddOrder} />
      <Route path="/productByClient" component={ProductForm} />
      <Route path='/validationForm' component={Validation}/>
      <Route path='/product/:userId' component={OrderClient}/>
      <Route path='/clientByDepartment/:departmentName' component={OrderByDepartment}/>
      <Route path='/orderStatusTrue/' component={OrderStatusTrue}/>
    </Switch>
  </Router>
);

export default Routes;
