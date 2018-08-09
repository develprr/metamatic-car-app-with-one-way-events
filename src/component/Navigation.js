import React from 'react';
import {logout, navigateBack} from '../store/MetaStore';

export class Navigation extends React.Component {

  onBackButtonClicked = () => navigateBack();

  onExitButtonClicked = () => logout();

  getBackButton = () => this.props.backButtonEnabled ? (
      <button id="back-button" type="button" className="btn btn-default btn-lg pull-left" onClick={this.onBackButtonClicked}>
        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> Back
      </button>
  ) : null;

  render = () => (
      <div id="navigation-div" className="row">
        <div className="col-xs-12">
          {this.getBackButton()}
          <button id="exit-button" type="button" className="btn btn-default btn-lg pull-right" onClick={this.onExitButtonClicked}>
            <span className="glyphicon glyphicon-log-out" aria-hidden="true"></span> Exit
          </button>
        </div>

      </div>
  );
}

