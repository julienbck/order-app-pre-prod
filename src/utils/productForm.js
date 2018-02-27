import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Navbar from './navbar.js';
import Popup from 'react-popup';

import history from '../history.js';



class ProductForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productCode: "",
      productSize: "",
      productOrigin: "",
      productQuantity: 1,
      departmentStore: "montagne",
      clientId: localStorage.getItem('idClient'),
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.addNewProduct = this.addNewProduct.bind(this);
    this.validateOrder = this.validateOrder.bind(this);
  }

  toggle() {
  this.setState({
    modal: !this.state.modal
  });
}
  addNewProduct(){
    this.setState({
      modal: !this.state.modal
    });
    window.location.reload();
  }
  validateOrder(){
    history.push(`/`);
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange = event => {
    this.setState({
    [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    fetch(
      `/api/insertitemdetails`, {
        method : 'POST',
        headers: {"Content-Type": "application/json"},
        body : JSON.stringify({
          productName : this.state.productName,
          productCode : this.state.productCode,
          productSize : this.state.productSize,
          productOrigin: this.state.productOrigin,
          productQuantity: this.state.productQuantity,
          departmentStore: this.state.departmentStore,
          clientId: this.state.clientId

        })
      }
    )
    .then(response => response.json())
    .catch(console.warn)
  }
  render(){
    return(
      <div body>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
          <ModalHeader toggle={this.toggle}>Produit ajouté</ModalHeader>
          <ModalBody>
            {"Tu as la possibilité de rajouter un produit à l'utilisateur si ce dernier en souhaite un autre ou bien tu peux tout simplement valider la commande"}
          </ModalBody>
          <ModalFooter>
            <button className="st-btn st-btn-primary st-btn-right" onClick={this.addNewProduct}><a style={{fontSize:'10px', fontWeight:'800'}}>Ajouter un autre produit produit</a></button>{' '}
            <button className="st-btn st-btn-yellow st-btn-right" onClick={this.validateOrder}><a style={{fontSize:'10px', fontWeight:'800'}}>Valider commande</a></button>
          </ModalFooter>
        </Modal>
      <Navbar />
      <form style={{display:'flex', flexDirection:'column', width:"30%", margin:"0 auto", textAlign:'center'}} action="" method="post" onSubmit={this.handleSubmit}>
        <a style={{fontSize: '30px', marginBottom: '20px'}} className="title-general">Ajout des <span>produits</span></a>
        <label className="grey">Nom produit</label>
        <input type="text" onChange={this.handleChange} value={this.state.productName} name="productName" required/>
        <label className="blue">Code produit</label>
        <input type="text" onChange={this.handleChange} value={this.state.productCode} name="productCode" required/>
        <label className="grey">Taille produit </label>
        <input type="text" onChange={this.handleChange} value={this.state.productSize} name="productSize" required/>
        <label className="blue">Quantité</label>
        <input type="number" onChange={this.handleChange} value={this.state.productQuantity} name="productQuantity" required/>
        <label className="grey">Provenance du produits</label>
        <input type="text" onChange={this.handleChange}value={this.state.productOrigin} name="productOrigin" required/>
        <label className="blue">Rayon</label>
        <select value={this.state.departmentStore} name="departmentStore" onChange={this.handleChange} >
          <option value="Montagne" name="montagne">Montagne</option>
          <option value="Sports Collectifs" name="sport co">Sport co</option>
          <option value="Nature" name="nature">Nature</option>
          <option value="Fitness" name="fitness">Fitness</option>
          <option value="Cycle" name="cycle">Cycle</option>
          <option value="Eau" name="eau">Eau</option>
        </select>
        <div className="add-order-zone-form">
            <Button onClick={this.toggle} className="st-btn st-btn-yellow st-btn-right"  type="submit">Valider le produit</Button>
      </div>
      </form>


      </div>
    );
  }
}

export default ProductForm;
