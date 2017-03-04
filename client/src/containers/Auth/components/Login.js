import React, { Component } from 'react';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import { isEmpty } from 'lodash';
import { Button, Grid, Form , Label } from 'semantic-ui-react';
import { Input } from 'formsy-semantic-ui-react';

import PersistentMessage from '../../../components/PersistentMessage';
import { login, logout } from '../../../actions/authActions';

class LoginComponent extends Component {
  handleLogin(data) {
    login(data.email, data.password);
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
    if(!isEmpty(this.props.auth.error)) {
      return (
        <PersistentMessage error>
          {this.props.auth.error.message}
        </PersistentMessage>
      );
    }
  }

  render() {
    let errorLabel = <Label basic color='red' pointing/>;

    return (
      <div className='login'>
        <Grid centered>
          <Grid.Column width='5'>
            <Formsy.Form
              noValidate
              onValidSubmit={ this.handleLogin.bind(this) }
              >

              <Form.Field>
                <label>Enter Email</label>
                <Input
                  className="full-width"
                  name="email"
                  placeholder="test@example.com"
                  required
                  validations="isEmail"
                  validationErrors={{
                    isEmail: 'This is not a valid Email',
                    isDefaultRequiredValue: 'Email is required',
                  }}
                  errorLabel={errorLabel}
                />
              </Form.Field>
              <br />
              <Form.Field>
                <label>Enter Password</label>
                <Input
                  className="full-width"
                  name="password"
                  type="Password"
                  required
                  validationErrors={{
                    isDefaultRequiredValue: 'Password is required',
                  }}
                  errorLabel={errorLabel}
                />
              </Form.Field>
              <br />

              { this.getErrorPanel() }
              <br />
              
              <Button basic color='green' type='submit'>Login</Button>
            </Formsy.Form>
          </Grid.Column>
        </Grid>
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
