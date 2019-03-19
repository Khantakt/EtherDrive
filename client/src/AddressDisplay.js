import React from 'react';
import "./GameCanvas.css";


export class AddressDisplay extends React.Component {

render() {
  return (
    <div id ="address-display">{this.props.address}</div>
)
}

}
