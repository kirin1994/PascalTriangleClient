import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('http://localhost:55976/api/pascal/calculate?NumberOfIterations=40&Modulo=3', {
      method: "GET",
      mode: "cors"
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          isLoaded: true,
          items: json,
          headers:
          {
            "Access-Control-Allow-Origin": "*"
          },

        })
      });
  }

  render() {
    var { isLoaded, items } = this.state

    if (!isLoaded) {
      return <div>Loading...</div>
    }

    else {
      return (
        <div className="triangle">
          {items.TriangleRows.map(row => <div className="triangle-row"> {row.ValuesOfCalculation.map(value => <a className={"triangle-component" + value} > {value} </a>)}</div>)}
        </div>
      );
    }
  }
}
export default App;
