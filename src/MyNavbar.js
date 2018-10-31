import React, { Component } from 'react';
import './MyNavbar.css'

export class MyNavbar extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
  }

  render() {
      return (
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand">
            <div className="mynav-class">Pascal Triangle</div>
          </a>
        </nav>
      );
  }
} export default MyNavbar;

