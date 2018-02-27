import React, { Component } from 'react';
import { Button } from 'reactstrap';

class clientForm extends Component {
  render(){
    return(
      <div>

      <form style={{display:'flex', flexDirection:'column', width:"30%", margin:"0 auto"}}action="" method="post" onSubmit={this.handleSubmit}>
        <h5>Produits désirés</h5>
      <label>Nom produit</label>
      <input type="text" onChange={this.handleProductName} value={this.state.productName} name="productNameValue"/>
      <label>Code produit</label>
      <input type="text" onChange={this.handleProductCode} value={this.state.productCode} name="productCodeValue"/>
      <label>Taille produit </label>
      <input type="text" onChange={this.handleProductSize} value={this.state.productSize} name="productSizeValue"/>
      <label>Provenance du produits</label>
        <div>
          <Button type="submit">Send</Button>
        </div>
      </form>


      </div>
    );
  }
}

export default clientForm;
