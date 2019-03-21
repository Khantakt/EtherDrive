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
    this.getCurrentPlayerId = this.getCurrentPlayerId.bind(this);
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
      const etherDrive = new web3.eth.Contract(EtherDriveContract.abi, contractAddress);

      // Set web3, accounts, and contract to the state, and then proceed with an
      this.setState({ web3: web3, account: account, accountParam: accountParam, contract: contractAddress, etherDrive: etherDrive});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);

    };

}

    componentDidMount() {
      return console.log(this.state.etherDrive.methods.createPlayer(this.state.account[0]).send({from: this.state.account[0]}));

    }


  // console.log(activated);
  //   if(!activated) {
  //     this.state.etherDrive.methods._createPlayer().call();
  //     console.log("it returned false")
  //     // this.setState({active: true});
  //   } else {
  //     // this.setState({active: true});
  //     console.log("it doesnt know whats going on")
  //   }}

  createNewPlayer() {
  const etherDrive = this.state.etherDrive;
  const account = this.state.account

  // This is going to take a while, so update the UI to let the user know
  // the transaction has been sent
  // Send the tx to our contract:
  // return console.log(etherDrive.methods.setPriceToPlay(50).send({from: account[0]}));
  // return console.log(etherDrive.methods.getPriceToPlay().call());
  return console.log(etherDrive.methods.checkRound().send({from: account[0]}));

}

getCurrentPlayerId(){
  return this.state.etherDrive.methods.getPlayerId().call({from: this.state.account[0]}).then(console.log);
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
        <button onClick = {this.getCurrentPlayerId}> get id</button>
        </div>
      </div>
    );
  }
}

export default App;
