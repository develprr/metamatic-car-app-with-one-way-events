import React from 'react';
import {CarFilterList} from './CarFilterList.js';
import {Navigation} from './Navigation.js';
import {connectAll, disconnect} from 'metamatic';
import {CarDetails} from './CarDetails';

export class Management extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loggedIn: true};
    connectAll(this, {
      LOGIN_STATE_CHANGE: (loggedIn) => this.setState({loggedIn}),
      CAR_MODEL_SELECTION_CHANGE: (selectedCarModel) => this.setState({selectedCarModel})
    });
  }

  componentWillUnmount = () => disconnect(this);

  getViewComponent = () => this.state.selectedCarModel ? <CarDetails/> : <CarFilterList/>;

  isBackButtonEnabled = () => this.state.selectedCarModel !== null;

  render = () => this.isBackButtonEnabled ? (
    <div className="App">
      <Navigation backButtonEnabled={this.isBackButtonEnabled()}/>
      {this.getViewComponent()}
    </div>
  ) : null;

}
