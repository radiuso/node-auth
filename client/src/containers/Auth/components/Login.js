import React, { Component } from 'react';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import RaisedButton from 'material-ui/RaisedButton';
import { isEmpty } from 'lodash';

import PersistentMessage from '../../../components/PersistentMessage';
import { login, logout } from '../../../actions/authActions';

class LoginComponent extends Component {
  state = {
    errors: {}
  }

  handleLogin(data) {
    if(!isEmpty(data.email) && !isEmpty(data.password)) {
      login(data.email, data.password);
    } else {
      this.setState({
        errors: {
          general: "Please complete the form"
        }
      });
    }
  }

  componentWillMount() {
    if(this.props.auth.isAuthenticated) {
      logout();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      nextProps.router.push('/');
    }
  }

  getErrorPanel() {
    if(!isEmpty(this.state.errors.general)) {
      return (
        <PersistentMessage type='error'>
          {this.state.errors.general}
        </PersistentMessage>
      );
    }
  }

  render() {
    
    return (
      <div className="login">
        { this.getErrorPanel() }
        <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={ this.handleLogin.bind(this) }
            onInvalidSubmit={this.notifyFormError}
          >
          <FormsyText
              name="email"
              validations="isEmail"
              validationError="Not an email my friend"
              floatingLabelText="Email"
            />
          <br />
          <FormsyText
              name="password"
              type="password"
              validations="isWords"
              validationError="hmmm"
              floatingLabelText="Password"
            />
            <br />
            <br />

            <RaisedButton
              type="submit"
              label="Login"
            />
        </Formsy.Form>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    auth: store.authState
  };
};

export default connect(mapStateToProps)(LoginComponent);
