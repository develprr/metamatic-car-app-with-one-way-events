import React from 'react';
import {CarModelList} from './CarModelList.js';
import {connect, disconnect} from 'metamatic';
import {attach, CAR_LIST_CHANGE, filterCarModels, requestCarList} from '../store/MetaStore';

export class CarFilterList extends React.Component {

	constructor(props) {
		super(props);
    this.state = {
      carModels: [],
      initialCarModels: []
    };
    connect(this, CAR_LIST_CHANGE, (carModels) => {
      carModels = Object.values(carModels);
      this.setState({carModels: carModels, initialCarModels: carModels});
    });
  }

  componentDidMount = () => requestCarList();

  componentWillUnmount = () => disconnect(this);

	handleSearchPhraseChange = (event) => filterCarModels(event.target.value);

	render = () => (
	  <div className="form-group container-fluid">.
      <div className="row">
        <input className="form-control" type="text" placeholder="Search" onChange={this.handleSearchPhraseChange}/>
      </div>
      <div className="row">
        <CarModelList items={this.state.carModels}/>
      </div>
    </div>
  );

}
