import React from 'react';
import {connect, disconnect} from 'metamatic';
import {attach, CAR_ENTRY_CHANGE, requestCarEntry} from '../store/MetaStore';

export class CarDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    requestCarEntry();
  }

  componentDidMount = () => connect(this, CAR_ENTRY_CHANGE, (carDetails) => this.setState({carDetails}));

  componentWillUnmount = () => disconnect(this);

  render() {
    let carDetails = this.state.carDetails;
    return carDetails ? (
        <ul className="list-group">
          <li className="list-group-item"><h3>{carDetails.model}</h3></li>
          <li className="list-group-item">Top Speed: {carDetails.speed}</li>
          <li className="list-group-item">Color: {carDetails.color}</li>
          <li className="list-group-item">Price: €{carDetails.price}</li>
        </ul>
    ) : null;

  }
}
