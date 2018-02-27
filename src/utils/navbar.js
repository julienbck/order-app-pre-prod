import React, { Component } from 'react';
import '../style.scss';

import history from '../history.js';
import { getClientState } from "../Store/client/selectors.js";
import { connect } from "react-redux";

const department = {
  mountain : 'montagne',
  sportCo : 'Sports Collectifs',
  water : 'Eau',
  fitness : 'Fitness',
  hunting : 'Nature',
  cycle : 'Cycle'

}

class Navbar extends Component {
  onClickOnDepartment(departmentName){
    history.push(`/clientByDepartment/${departmentName}`);
    window.location.reload();
  }
  onClickonStatus(){
    history.push(`/orderStatusTrue/`);
    window.location.reload();
  }
  render(){
    return(
      <div className="header-content">
        <div className="navbar-content">
          <div className="item-navbar">
            <ul>
              <li><a href="/">Accueil</a></li>
              <li className="add-order-name-menu"><a href="/addorder">Ajouter inter</a></li>
              <li className="departement-menu"><a>Par rayon</a>
                <ul className="departement-submenu">
                  <li><a onClick={ () => this.onClickOnDepartment(department.mountain)}>Montagne</a></li>
                  <li><a onClick={ () => this.onClickOnDepartment(department.sportCo)}>Sports{' '}Co</a></li>
                  <li><a onClick={ () => this.onClickOnDepartment(department.water)}>Eau</a></li>
                  <li><a onClick={ () => this.onClickOnDepartment(department.fitness)}>Fitness</a></li>
                  <li><a onClick={ () => this.onClickOnDepartment(department.hunting)}>Nature</a></li>
                  <li><a onClick={ () => this.onClickOnDepartment(department.cycle)}>Cycle</a></li>
                </ul>
              </li>
              <li className="put-at-home"><a onClick={ () => this.onClickonStatus()}>{"Mis à l'accueil"}</a></li>
              <li>Support</li>
            </ul>
          </div>
        </div>
        <h2>Commandes <span className="span-h2">#198</span></h2>
      </div>
    );
  }
}

export default connect(getClientState, null)(Navbar);
