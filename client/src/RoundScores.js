import React from 'react';
import "./RoundScores.css";



export class RoundScores extends React.Component {

render() {
  return (
    <div class = "row">
      < div className="round-score col-3">{this.props.spinOne}</div>
      < div className="round-score col-3">{this.props.spinTwo}</div>
      < div className="round-score col-3">{this.props.spinThree}</div>
      < div className="round-score col-3">{Number(this.props.spinOne) + Number(this.props.spinTwo) + Number(this.props.spinThree)}</div>
    </div>
    )
  }
}
