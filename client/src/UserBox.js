import React from 'react';
import "./GameCanvas.css";
import {AddressDisplay} from "./AddressDisplay";
import {RoundScores} from "./RoundScores";


export class UserBox extends React.Component {

render() {
  return (
    < div id ="userbox-display" className="col-lg-4">
    <AddressDisplay address = {this.props.address}/>
    <RoundScores spinOne = {this.props.spinOne} spinTwo = {this.props.spinTwo} spinThree = {this.props.spinThree}/>
    </div>

)
}

}
