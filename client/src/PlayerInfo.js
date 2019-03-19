import React from 'react';
import "./GameCanvas.css";


export class PlayerInfo extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    contract: null,
    userId: null,
    round: null,
    spinCount: null
  }
}

getPlayerDetails() {
        const userId = this.state.userId
        return this.state.contract.methods.players(userId).call()
      }

render() {
  return
}

}
