import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import AppSearchBar from '../../components/AppSearchBar';
import PersistentMessage from '../../components/PersistentMessage';


import './App.scss';

class App extends Component {
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
    return (
      <div>
        <AppSearchBar isLogged={ this.props.auth.isAuthenticated } />
        <div className="App">
          { this.getErrorMessagePanel() }
          { this.props.children }
        </div>
      </div>
    );
  }
}


const mapStateToProps = function(store) {
  return {
    auth: store.authState,
    messages: store.messageState
  };
};

export default connect(mapStateToProps)(App);
