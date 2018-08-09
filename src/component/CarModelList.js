import React from 'react';
import {connect, disconnect} from 'metamatic';
import {CAR_LIST_CHANGE, requestCarList, selectCarModel} from '../store/MetaStore';

export class CarModelList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cars: []
    };
    connect(this, CAR_LIST_CHANGE, (cars) => this.setState({cars: Object.values(cars)}));
  }

  componentWillUnmount = () => disconnect(this);

  componentDidMount = () => requestCarList();

  getCarList = () => this.state.cars.map((item) =>
    <li className="list-group-item" data-id={item.id} onClick={() => selectCarModel(item.id)}  key={item.model.toString()}>
      {item.model}
    </li>
  );

  render = () => <ul className="list-group">{this.getCarList()}</ul>;

}
