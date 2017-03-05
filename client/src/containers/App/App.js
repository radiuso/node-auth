import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { Dimmer, Loader, Segment } from 'semantic-ui-react'

import AppSearchBar from '../../components/AppSearchBar';
import PersistentMessage from '../../components/PersistentMessage';
import { isLoaded } from '../../actions/appActions';

import './App.scss';

class App extends Component {
  componentDidMount() {
    isLoaded();
  }

  getErrorMessagePanel() {
    if(!isEmpty(this.props.messages.error)) {
      return (
        <PersistentMessage 
          errorCode={this.props.messages.error.code}
          error
        >
          {this.props.messages.error.message}
        </PersistentMessage>
      );
    }
  }

  render() {
    const active = this.props.app.isLoading;
    return (
      <div className="App">
        <Dimmer.Dimmable dimmed={active}>
          <Dimmer active={active} inverted>
            <Loader>Loading</Loader>
          </Dimmer>
            <AppSearchBar isLogged={ this.props.auth.isAuthenticated } />
            <div>
              { this.getErrorMessagePanel() }
              { this.props.children }
            </div>
        </Dimmer.Dimmable>
      </div>
    );
  }
}


const mapStateToProps = function(store) {
  return {
    app: store.appState,
    auth: store.authState,
    messages: store.messageState
  };
};

export default connect(mapStateToProps)(App);
