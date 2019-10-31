// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Assets
import logo from './images/Logo.png';
import './css/Header.css';

class Header extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };
  render(){
    const { title, items} = this.props;
    return (
      <div className="Header">
        <div className="Logo">
          <img src={logo} className="App-logo" alt="logo" />

          <ul className="Menu">
            {items && items.map((item, key) => <li key={key}><Link to={item.url}>{item.title}</Link></li>)}
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
