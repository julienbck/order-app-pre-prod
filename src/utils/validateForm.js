import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';


class Validation extends Component {
  clearLocalStorage = () => {
    localStorage.clear();
  }
  render(){
    return(
      <div>
        <p>
          Formulaire validé.
          Souhaites tu ajouter un nouveau produit ou terminer la procédure ?
        </p>

        <Button><Link to="/productByClient"> Ajouter Produit</Link></Button>
        <Button onClick={this.clearLocalStorage}><Link to="/">Valider Commande </Link></Button>

      </div>
    );
  }
}

export default Validation
