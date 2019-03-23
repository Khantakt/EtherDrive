import React, { Component } from "react";
import {GameCanvas} from "./GameCanvas";
import EtherDriveContract from "./contracts/EtherWheel.json";
import getWeb3 from "./utils/getWeb3";
import {UserBox} from "./UserBox";
import "./App.css";




class App extends Component {
  constructor(props){
    super(props);
    this.state = { web3: null, account: null, accountParam : null, contract: null, etherDrive: null, roundCount:0, active: false, userId: null, textArea: "", spinCount: 0, roundScore: 0, roundGoal : 250, lastNumber:0, roundScoreSave: 0, spinCountSave: 0, roundGoalSave:0, spinOne: 0, spinTwo:0, spinThree: 0};
    this.createNewPlayer = this.createNewPlayer.bind(this);
    this.getCurrentPlayerId = this.getCurrentPlayerId.bind(this);
    this.spinTheWheel = this.spinTheWheel.bind(this);
    this.getCurrentSpinCount = this.getCurrentSpinCount.bind(this);
    this.getCurrentRoundGoal = this.getCurrentRoundGoal.bind(this);
    this.getCurrentRoundScore = this.getCurrentRoundScore.bind(this);
    this.getPlayerData = this.getPlayerData.bind(this);
    this.getSpinOne = this.getSpinOne.bind(this);
    this.getSpinTwo = this.getSpinTwo.bind(this);
    this.getSpinThree = this.getSpinThree.bind(this);
    // this.displayRoundInfo = this.displayRoundInfo.bind(this);
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

setInterval(this.getPlayerData(), 500);

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

//   componentDidMount() {
//
//     this.getData();
//   }
//
// getData() {
//   // Use web3 to get the user's accounts.
//   getWeb3()
//   .then(results => {
//     this.setState({
//       web3: results.web3
//     })
//     this.getData()
//   })
//   .catch(() => {
//     console.log('Error finding web3.')
//   })
//   setInterval(this.getData(), 5000);
// }

spinTheWheel() {
  const etherDrive = this.state.etherDrive;
  const account = this.state.account
  etherDrive.methods.spinWheel().send({from: account[0]}).then(console.log);;

  setInterval(this.getPlayerData, 10000);
}

createNewPlayer(){
  this.state.etherDrive.methods.createPlayer().send({from: this.state.account[0]});

  setTimeout(this.getPlayerData,8000);
}

getCurrentPlayerId(){
  const self = this;
  this.state.etherDrive.methods.getPlayerId().call({from: this.state.account[0]}).then(function(data){
      self.setState({userId: data });
  });
}

getCurrentSpinCount(){
  const self = this;
  this.state.etherDrive.methods.getSpinCount().call({from: this.state.account[0]}).then(function(data){
      self.setState({spinCount: data });
  });
}

getCurrentRoundCount(){
  const self = this;
  this.state.etherDrive.methods.getRoundCount().call({from: this.state.account[0]}).then(function(data){
      self.setState({roundCount: data });
  });
}

getCurrentRoundGoal(){
  const self = this;
  this.state.etherDrive.methods.getRoundGoal().call({from: this.state.account[0]}).then(function(data){
      self.setState({roundGoal: data });
  });
}

getCurrentRoundScore(){
  const self = this;
  this.state.etherDrive.methods.getRoundScore().call({from: this.state.account[0]}).then(function(data){
      self.setState({roundScore: data });
  });
}

getSpinOne(){
  const self = this;
  this.state.etherDrive.methods.getSpinOne().call({from: this.state.account[0]}).then(function(data){
      self.setState({spinOne: data });
})

}

getSpinTwo(){
  const self = this;
  this.state.etherDrive.methods.getSpinTwo().call({from: this.state.account[0]}).then(function(data){
      self.setState({spinTwo: data });
})

}

getSpinThree(){
  const self = this;
  this.state.etherDrive.methods.getSpinThree().call({from: this.state.account[0]}).then(function(data){
      self.setState({spinThree: data });
})

}

// displayRoundInfo(){
//   if(this.state.spinCount === 2){
//     this.setState({roundGoalSave: this.state.roundGoal, roundScoreSave : this.state.roundCount, spinCountSave: this.state.spinCount })
//   } else if(this.state.spinCount === 1) {
//     this.setState({roundGoal: this.state.roundGoalSave, roundScore: this.state.roundScoreSave + this.state.lastNumber, spinCount: this.state.spinCountSave})
//   }
// }

getPlayerData(){

    this.getCurrentSpinCount();
    this.getCurrentRoundGoal();
    this.getCurrentRoundScore();
    this.getCurrentRoundCount();
    this.getCurrentPlayerId();
    this.getSpinOne();
    this.getSpinTwo();
    this.getSpinThree();

}

watchRoundResults() {
  this.state.etherDrive.events.RoundResults({ filter: { userId: this.state.userId } })
.on("data", function(event) {
  let data = event.returnValues;
  console.log(data);
  // The current user just received a zombie!
  // Do something here to update the UI to show it
}).on("error", console.error);
}

  render() {
    return (
      <div className="App">
        <div className = "container display-box">
        <GameCanvas />
        <UserBox address = {this.state.account} spinOne = {this.state.spinOne} spinTwo = {this.state.spinTwo} spinThree = {this.state.spinThree}/>
        <p>{this.state.textArea}</p>
        <p>ID: {this.state.userId}</p>
        <p>Spin number: {this.state.spinCount} of 3</p>
        <p>Goal: {this.state.roundGoal}</p>
        <button onClick = {this.spinTheWheel}>Spin the Wheel</button>
        <button onClick = {this.createNewPlayer}>Create New Player</button>
        </div>
      </div>
    );
  }
}

export default App;
