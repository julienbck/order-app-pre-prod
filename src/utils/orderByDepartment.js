import React, { Component } from 'react';
import { Link} from "react-router-dom";
import { connect } from "react-redux";
import { Button } from 'reactstrap';
import { getClientState } from "../Store/client/selectors.js";
import { clientActions } from "../Store/client/actions.js";
import Navbar from './navbar.js';

import history from '../history.js';



class OrderByDepartment extends Component {
  componentWillMount(){
    this.props.fetchClientsByDepartement(this.props.match.params.departmentName)
  }
  onClick = userId =>{
    this.props.deleteOrderByUser(userId);
    window.location.reload();
  }
  redirectionSeeOrder = userId =>{
    history.push(`/product/${userId}`);
  }
  render(){
    return(
      <div style={{textAlign: 'center'}}className="home-container">
      <Navbar />
      <a className='title-general'>Liste <span>commandes</span>{' '}rayon {this.props.match.params.departmentName}</a>
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

export default connect(getClientState, clientActions)(OrderByDepartment);
