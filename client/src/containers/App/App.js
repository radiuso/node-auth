import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppSearchBar from '../../components/AppSearchBar';


import './App.scss';

class App extends Component {
  render() {
    return (
      <div>
        <AppSearchBar isLogged={ this.props.auth.isAuthenticated } />
        <div className="App">
          {this.props.children}
        </div>
      </div>
    );
  }
}


const mapStateToProps = function(store) {
  return {
    auth: store.authState
  };
};

export default connect(mapStateToProps)(App);
