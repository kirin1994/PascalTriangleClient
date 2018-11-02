import React, { Component } from 'react';
import './App.css';
import { MyNavbar } from './MyNavbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      moduloValue: 0,
      triangleHeight: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event)
  {
    console.log("zmieniam");
  this.setState({
    [event.target.name]: event.target.value
  })
  }

  handleSubmit(event)
  {
    console.log(event.target.moduloValue);
    this.setState({moduloValue : event.target.moduloValue, triangleHeight : event.target.triangleHeight});
    this.getTrojkat();
    event.preventDefault();
  }

  getTrojkat() {
    console.log("wszedlem" + this.state.moduloValue + this.state.triangleHeight);
    if(this.state.moduloValue == 0 || this.state.triangleHeight == 0)
    {
      return;
    }
    fetch('http://localhost:55976/api/pascal/calculate?NumberOfIterations='+ this.state.triangleHeight+'&Modulo=' + this.state.moduloValue, {
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


  componentDidMount() {
    if(this.state.moduloValue == 0 || this.state.triangleHeight == 0)
    {
      return;
    }
    fetch('http://localhost:55976/api/pascal/calculate?NumberOfIterations='+ this.state.triangleHeight+'&Modulo=' + this.state.moduloValue, {
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

    var { isLoaded, items, moduloValue, triangleHeight } = this.state
    if (moduloValue == 0 || triangleHeight == 0 || !isLoaded) {
      return  (    
      <form onSubmit={this.handleSubmit}>
      <label>Modulo: 
      <input type="text" name="moduloValue" value={this.state.moduloValue} onChange={this.handleChange}/>
      </label>
      <label>Triangle Height: 
      <input type="text" name="triangleHeight" value={this.state.triangleHeight} onChange={this.handleChange}/>
      </label>
      <input type="submit" value="Submit"/>
    </form>)
    }

    else if(items != []){
      return (
        <div className="triangle">
  <form onSubmit={this.handleSubmit}>
      <label>Modulo: 
      <input type="text" name="moduloValue" value={this.state.moduloValue} onChange={this.handleChange}/>
      </label>
      <label>Triangle Height: 
      <input type="text" name="triangleHeight" value={this.state.triangleHeight} onChange={this.handleChange}/>
      </label>
      <input type="submit" value="Submit"/>
    </form>)
          {items.TriangleRows.map(row => <div className="triangle-row"> {row.ValuesOfCalculation.map(value => <a className={"triangle-component" + value} > {value} </a>)}</div>)}
         
        </div>
      );
    }
  }
}
export default App;
