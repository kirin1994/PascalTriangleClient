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
    [event.target.name]: event.target.value,
    isLoaded : false,
  })
  }

  handleSubmit(event)
  {
    this.getTrojkat();
    event.preventDefault();
  }

  getTrojkat() {
    fetch('https://localhost:44307/api/pascal/calculate?NumberOfIterations='+ this.state.triangleHeight+'&Modulo=' + this.state.moduloValue, {
      method: "GET",
      mode: "cors",
    })
      .then(function(res)
      {
        console.log(res);
        if (res.ok){
        return res.json();
      }
       else {
         throw Error(res.statusText)} 
      })
      .then(json => {
        console.log(json);
        this.setState({
          isLoaded: true,
          items: json,
        })
      }).catch(error => console.log(error));
  }

  render() {

    var { isLoaded, items, moduloValue, triangleHeight } = this.state
    if (moduloValue == 0 || triangleHeight == 0 || !isLoaded) {
      return  (  
        <div className="triangle">
        <div style={{width:300, alignContent: "center"}}>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Modulo</span>
              </div> 
              <input type="text" aria-label="Modulo" aria-describedby="basic-addon1" className="form-control" name="moduloValue" value={this.state.moduloValue} onChange={this.handleChange}/>
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Triangle Height</span>
              </div> 
              <input type="text" aria-label="Triangle Height" aria-describedby="basic-addon1" className="form-control" name="triangleHeight" value={this.state.triangleHeight} onChange={this.handleChange}/>
            </div>
            <input type="submit" className="form-control" value="Submit"/>
           </form>
           </div>
        </div>)
    }

    else if(items != [] && items != undefined){
      return (
        <div className="triangle">
              <div style={{width:300, alignContent: "center"}}>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Modulo</span>
              </div> 
              <input type="text" aria-label="Modulo" aria-describedby="basic-addon1" className="form-control" name="moduloValue" value={this.state.moduloValue} onChange={this.handleChange}/>
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Triangle Height</span>
              </div> 
              <input type="text" aria-label="Triangle Height" aria-describedby="basic-addon1" className="form-control" name="triangleHeight" value={this.state.triangleHeight} onChange={this.handleChange}/>
            </div>
            <input type="submit" className="form-control"  value="Submit"/>
           </form>
           </div>
           {console.log(items)}
          {items.TriangleRows.map(row => <div className="triangle-row"> {row.ValuesOfCalculation.map(value => <a className={"triangle-component-core triangle-component-color" + value} > {value} </a>)}</div>)}
         
        </div>
      );
    }
  }
}
export default App;
