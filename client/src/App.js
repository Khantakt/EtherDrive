import React, { Component } from "react";
import {GameCanvas} from "./GameCanvas";
import EtherDriveContract from "./contracts/EtherWheel.json";
import getWeb3 from "./utils/getWeb3";
import {UserBox} from "./UserBox";
// import "./App.css";

class App extends Component {
  constructor(props){
    super(props);
    this.state = { storageValue: 0, web3: null, account: null, contract: null, etherDrive: null, round:0, active: false, userId: null};
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      let account = await web3.eth.getAccounts();
      let accountParam = account.toString();

      // Get the contract instance.

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = EtherDriveContract.networks[networkId];
      const contractAddress = deployedNetwork.address;
      const etherDrive = new web3.eth.Contract(
        EtherDriveContract.abi,
        contractAddress
      );

      // etherDrive.methods._createPlayer().call();
      console.log(etherDrive.methods.getPlayerId(accountParam).call());

      // Set web3, accounts, and contract to the state, and then proceed with an
      this.setState({ web3: web3, account: account, contract: contractAddress, etherDrive: etherDrive});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    return (
      <div className="App">
        <div class = "container">
        <GameCanvas />
        <UserBox address = {this.state.account} />
        <p>{this.state.contract}</p>
        </div>
      </div>
    );
  }
}

export default App;
