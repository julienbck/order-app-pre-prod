import React, { Component } from 'react';
import { connect } from "react-redux";
import Navbar from './navbar.js';


import { getClientState } from "../Store/client/selectors.js";
import { clientActions } from "../Store/client/actions.js";

class OrderClient extends Component {
  componentWillMount(){
    this.props.fetchProductByClient(this.props.match.params.userId)
  }
  render(){
    return(
      <div>
      <Navbar />
      {this.props.productData.map( product => {
        return(
            <div className="client-list">
              <div style={{display:'flex', justifyContent:'center', flexDirection:'column', width: '100%'}} className="client-informations">
                <p><span>Nom produit:</span> {product.product_name} </p>
                <p><span>Rayon:</span> {product.product_department} </p>
                <p><span>Code produit:</span> {product.product_code} </p>
                <p><span>Taille produit:</span> {product.product_size} </p>
                <p><span>Quantité:</span> {product.product_quantity} </p>
                <p><span>Origine:</span> {product.product_origin} </p>
              </div>
            </div>
        );
      }
  )}
      </div>
    );
  }
}

export default connect(getClientState, clientActions)(OrderClient);
