import React from 'react';
import "./GameCanvas.css";
import {AddressDisplay} from "./AddressDisplay";


export class UserBox extends React.Component {

render() {
  return (
    < div id ="userbox-display" className="col-lg-4">
    <AddressDisplay address = {this.props.address}/>
    </div>
)
}

}
