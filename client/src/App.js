import React, { Component } from "react";
import {GameCanvas} from "./GameCanvas";
// import EtherDriveContract from "./contracts/EtherWheel.json";
// import getWeb3 from "./utils/getWeb3";
import "./App.css";

class App extends Component {

  render() {
    return (
      <div className="App">
        <GameCanvas/>
        <h1>Good to Go!</h1>
        <h2>Smart Contract Example</h2>

      </div>
    );
  }
}

export default App;
