import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Dimmer, Loader } from 'semantic-ui-react';
import Notifications from 'react-notification-system-redux';

import AppSearchBar from '../../components/AppSearchBar';
import { isLoaded } from '../../actions/appActions';

import './App.scss';

class App extends Component {
  componentDidMount() {
    isLoaded();
  }

  render() {
    const { notifications, auth, children, app } = this.props;
    const active = app.isLoading;

    return (
      <div className="App">
        <Dimmer.Dimmable dimmed={active}>
          <Dimmer active={active} inverted>
            <Loader>Loading</Loader>
          </Dimmer>
            <AppSearchBar 
              isLogged={ auth.isAuthenticated }
              displaySearch={ true }
              onSearch={ app.onSearch }
              searchValue={ app.searchValue } />
            <div>
              <Notifications
                notifications={notifications}
              />
              { children }
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
    notifications: store.notifications
  };
};

export default connect(mapStateToProps)(App);
