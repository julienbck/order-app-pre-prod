import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Moment from 'react-moment';
import Navbar from './navbar.js';



class AddOrder extends Component {


  constructor(props) {
    super(props);
    this.state = {
      firstName : "",
      lastName: "",
      phoneNumber: "",
      orderStatus: false,
      clientCalled: false,
      comments: "",
      typeOrder : "Intermagasin"
    }
  }
handleChange = event => {
  this.setState({
  [event.target.name]: event.target.value
  })
}

handleSubmit = event => {
  event.preventDefault();
  fetch(
    `/api/insertclientdetails`, {
      method : 'POST',
      headers: {"Content-Type": "application/json"},
      body : JSON.stringify({
        firstName : this.state.firstName,
        lastName : this.state.lastName,
        phoneNumber : this.state.phoneNumber,
        orderStatus: this.state.orderStatus,
        clientCalled: this.state.clientCalled,
        comments: this.state.comments,
        typeOrder : this.state.typeOrder
      })
    }
  )
  .then(response => response.json())
  .then(result => {
    console.log(result.rows);
    localStorage.setItem('idClient', result.rows[0].id);
    this.props.history.push(`/productByClient`);
  })
  .catch(console.warn)
}


  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="form-content">
        <form style={{display:'flex', flexDirection:'column', width:"30%", margin:"5% auto 0 auto"}} action="" method="post" onSubmit={this.handleSubmit}>
          <a style={{fontSize: '30px', marginBottom: '20px'}} className="title-general">Informations de <span>{"l'utilisateur"}</span></a>
        <label>Prénom</label>
        <input type="text" onChange={this.handleChange} value={this.state.firstName} name="firstName"/>
        <label>Nom</label>
        <input type="text" onChange={this.handleChange} value={this.state.lastName} name="lastName"/>
        <label>Téléphone</label>
        <input type="text" onChange={this.handleChange} value={this.state.phoneNumber} name="phoneNumber"/>
        <label>Commentaires</label>
        <input type="text" onChange={this.handleChange} value={this.state.comments} name="comments"/>
        <select value={this.state.typeOrder} name="typeOrder" onChange={this.handleChange} >
          <option value="Intermagasin" name="intermagasin">Intermagasin</option>
          <option value="Commande" name="commande">Commande</option>
          <option value="Réservation" name="réservation">Réservation</option>>
        </select>
          <div style={{marginTop: '10%'}}className="add-order-zone-form">
              <Button className="st-btn st-btn-yellow st-btn-right"  type="submit">Ajouter les produits</Button>
        </div>
        </form>
        </div>
      </div>
    );
  }
}

export default AddOrder;
