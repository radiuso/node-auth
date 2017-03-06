import React, { Component, PropTypes } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { APP_NAME } from '../../constants';

import MenuItemLink from '../MenuItemLink';
import AppSearch from '../AppSearch';

class AppSearchBar extends Component {
  static propTypes = {
    isLogged: PropTypes.bool.isRequired,
    displaySearch: PropTypes.bool.isRequired,
  }

  getRightElements() {
    const { isLogged } = this.props;
    if(isLogged) {
      return (
        <Menu.Menu position='right'>
          <Menu.Item>
            <AppSearch />
          </Menu.Item>

          <MenuItemLink to='/login'>
            <Button>Logout</Button>
          </MenuItemLink>
        </Menu.Menu>
      );
    }
    else {
      return (
        <Menu.Menu position='right'>
          <MenuItemLink to='/signup'>
            <Button primary>Sign up</Button>
          </MenuItemLink>

          <MenuItemLink to='/login'>
            <Button>Login</Button>
          </MenuItemLink>
        </Menu.Menu>
      );
    }
  }
  
  render() {
    const rightElements = this.getRightElements();

    return (
      <Menu stackable borderless>
        <MenuItemLink header to='/' onlyActiveOnIndex>
          {APP_NAME}
        </MenuItemLink>
        
        <MenuItemLink to='/users'>
          Users
        </MenuItemLink>

        { rightElements }
      </Menu>
    );
  }
}

export default AppSearchBar;