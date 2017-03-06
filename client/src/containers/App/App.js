import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { Dimmer, Loader } from 'semantic-ui-react'

import AppSearchBar from '../../components/AppSearchBar';
import Message from '../../components/Message';
import { isLoaded } from '../../actions/appActions';

import './App.scss';

class App extends Component {
  componentDidMount() {
    isLoaded();
  }

  getErrorMessagePanel() {
    if(!isEmpty(this.props.messages.error)) {
      return (
        <Message 
          code={this.props.messages.error.code}
          error
        >
          {this.props.messages.error.message}
        </Message>
      );
    }
    else if(!isEmpty(this.props.messages.warning)) {
      return (
        <Message 
          code={this.props.messages.warning.code}
          warning
        >
          {this.props.messages.warning.message}
        </Message>
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
