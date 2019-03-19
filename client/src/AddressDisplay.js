import React from 'react';
import "./GameCanvas.css";


export class AddressDisplay extends React.Component {

render() {
  return (
    <div id ="address-display">Account: {this.props.address}</div>
)
}

}
