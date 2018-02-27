import React, { Component } from 'react';
import { Link} from "react-router-dom";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getClientState } from "../Store/client/selectors.js";
import { clientActions } from "../Store/client/actions.js";
import Navbar from './navbar.js';

import history from '../history.js';



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }
  componentWillMount(){
    this.props.fetchClients();
  }
  deleteOrder = userId =>{
    this.props.deleteOrderByUser(userId);
    window.location.reload();
  }
  toggle() {
  this.setState({
    modal: !this.state.modal
  });
}
  redirectionSeeOrder = userId =>{
    history.push(`/product/${userId}`);
  }
  render(){
    return(
      <div className="home-container">
      <Navbar />
      <a className='title-general'>Liste <span>commandes</span></a>
      <div className="client-grid-content">
      {this.props.clientsData.map( informations => {
        {console.log(informations)}
        return(
            <div className="client-list">
              <div className="client-informations">
                <div className="fullname-block">
                <p>{informations.first_name}{" "}{informations.last_name}</p>
                </div>
                <p><span><i className="fas fa-phone"></i></span>{" "} {informations.phone_number}</p>

                <p><span><i className="fas fa-calendar-alt"></i></span>{" "} {informations.order_date}</p>

                <p><span>Type :</span>{' '}{informations.type_order}</p>

                <p><i style={{fontSize: "10px", color:"#333"}} className="fas fa-quote-left"></i>{" "}{informations.order_comments}{" "}<i style={{fontSize: "10px", color:"#333"}}
                className="fas fa-quote-right"></i></p>

                <p><span><i className="fas fa-tty"></i></span>{" "}
                {informations.client_called ? (
                  <i style={{color: 'green'}} className="fas fa-check"></i>
                ) : <i style={{color: 'red'}} className="fas fa-times"></i>}</p>



              <p><span> <i className="fas fa-shopping-cart"></i></span>{" "}
              {informations.order_status ? (
              <i style={{color: 'green'}} className="fas fa-check"></i>
            ) : <i style={{color: 'red'}} className="fas fa-times"></i>}</p>

              <div className="button-zone-item-details">
                {informations.client_called ? (
                  <div style={{width:'100%'}}>
                  <a onClick={() => this.props.changeClientCalledStatusFalse(informations.id)} className="st-btn st-btn-secondary st-btn-small st-btn-right" style={{color:"#FFF"}}>
                Client non appelé
                </a>
                <p style={{fontSize:'10px', marginTop: '-10px', marginBottom: '2px'}}>(cliquer sur ce bouton si erreur)</p>
                </div>
              ) :
                <a onClick={() => this.props.changeClientCalledStatusTrue(informations.id)} className="st-btn st-btn-primary st-btn-small st-btn-right" style={{color:"#FFF"}}>
                Client appelé
                </a>
              }

                {informations.order_status ? (
                  <div style={{width:'100%'}}>
                  <a onClick={() => this.props.changeOrderStatusFalse(informations.id)} className="st-btn st-btn-secondary st-btn-small st-btn-right" style={{color:"#FFF"}}>
                  {"Produit non déposé"}
                  </a>
                  <p style={{fontSize:'10px', marginTop: '-10px', marginBottom: '2px'}}>(cliquer sur ce bouton si erreur)</p>
                  </div>
                 ) :
                <a onClick={() => this.props.changeOrderStatusTrue(informations.id)} className="st-btn st-btn-primary st-btn-small st-btn-right" style={{color:"#FFF"}}>
                {"Produit déposé"}
                </a>
              }


                <a onClick={ () => this.redirectionSeeOrder(informations.id)} style={{color:"#FFF"}} className="st-btn st-btn-primary st-btn-small st-btn-right">
                Voir Commande
                </a>

                <a onClick={this.toggle} style={{color:"#FFF"}} className="st-btn st-btn-primary st-btn-small st-btn-right">
                Produit Remis
                </a>
                </div>
              </div>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
                  <ModalHeader toggle={this.toggle}>Produit ajouté</ModalHeader>
                  <ModalBody>
                    {"Tu as la possibilité de rajouter un produit à l'utilisateur si ce dernier en souhaite un autre ou bien tu peux tout simplement valider la commande"}
                  </ModalBody>
                  <ModalFooter>
                    <button className="st-btn st-btn-secondary st-btn-right" onClick={this.toggle}><a style={{fontSize:'10px', fontWeight:'800'}}>Annuler</a></button>{' '}
                    <button className="st-btn st-btn-primary st-btn-right" onClick={() => this.deleteOrder(informations.id)}><a style={{fontSize:'10px', fontWeight:'800'}}>Valider</a></button>
                  </ModalFooter>
                </Modal>
            </div>
        );
      }
  )}
          </div>
          <div className="add-order-zone">
              <a href="/addorder" className="st-btn st-btn-yellow st-btn-right">
                Ajouter commande
              </a>
        </div>
      </div>
    );
  }
}

export default connect(getClientState, clientActions)(Home);
