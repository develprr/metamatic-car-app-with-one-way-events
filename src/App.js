import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {AppTitle} from './component/AppTitle.js';
import {Management} from './component/Management.js';
import {Login} from './component/Login.js';
import {initMetaStore, LOGIN_STATE_CHANGE} from './store/MetaStore';
import {connect, disconnect} from 'metamatic';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => connect(this, LOGIN_STATE_CHANGE, (loggedIn) => this.setState({loggedIn}));

  componentWillUnmount = () => disconnect(this);

  getViewComponent = () => this.state.loggedIn ? <Management/> : <Login/>;

  render = () => (
    <div className="container-fluid">
      <AppTitle name="Cars"/>
      {this.getViewComponent()}
    </div>
  );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
