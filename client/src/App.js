import React, { Component } from "react";
import {GameCanvas} from "./GameCanvas";
import EtherDriveContract from "./contracts/EtherWheel.json";
import getWeb3 from "./utils/getWeb3";
import {UserBox} from "./UserBox";
import "./App.css";

class App extends Component {
  constructor(props){
    super(props);
    this.state = { web3: null, account: null, accountParam : null, contract: null, etherDrive: null, round:0, active: false, userId: null, textArea: "", balance :0};

    this.createNewPlayer = this.createNewPlayer.bind(this);
    this.currentPlayerId = this.currentPlayerId.bind(this);
  }

  componentWillMount = async () => {
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
      const etherDrive = new web3.eth.Contract(EtherDriveContract.abi, contractAddress);

      // Set web3, accounts, and contract to the state, and then proceed with an
      this.setState({ web3: web3, account: account[0], accountParam: accountParam, contract: contractAddress, etherDrive: etherDrive});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);

    }



    };
  // console.log(activated);
  //   if(!activated) {
  //     this.state.etherDrive.methods._createPlayer().call();
  //     console.log("it returned false")
  //     // this.setState({active: true});
  //   } else {
  //     // this.setState({active: true});
  //     console.log("it doesnt know whats going on")
  //   }


currentPlayerId() {
var playerId = this.state.etherDrive.methods.getPlayerId.call()
console.log(playerId);
}

isAccountActivated() {

}


// Get playerId with address
  createNewPlayer() {
    const etherDrive = this.state.etherDrive;
  // This is going to take a while, so update the UI to let the user know
  // the transaction has been sent
  this.setState({textArea: "Creating new player on the blockchain. This may take a while..."});
  // Send the tx to our contract:

return etherDrive.methods.createPlayer
        .send({ from: this.state.account })
        .on("receipt", function(receipt) {
})
}


  render() {
    return (
      <div className="App">
        <div className = "container">
        <GameCanvas />
        <UserBox address = {this.state.account} />
        <p>{this.state.textArea}</p>
        <p>{this.state.balance}</p>
        <p>{this.state.contract}</p>
        <p>{this.state.active.toString()}</p>
        <p>{this.state.userId}</p>
        <button onClick = {this.createNewPlayer}>create player</button>
        <button onClick = {this.currentPlayerId}> get id</button>
        </div>
      </div>
    );
  }
}

export default App;
