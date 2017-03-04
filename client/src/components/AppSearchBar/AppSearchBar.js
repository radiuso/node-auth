import React, {Component} from 'react';
import { Menu, Button } from 'semantic-ui-react';

import MenuItemLink from '../MenuItemLink';

import { APP_NAME } from '../../constants';

export default class AppSearchBar extends Component {
  getLoginLeftMenu() {
    return (
      <Menu.Menu>
      </Menu.Menu>
    );
  } 

  getLoggedLeftMenu() {
    return (
      <Menu.Menu>
        <MenuItemLink to='/users'>
          Users
        </MenuItemLink>
      </Menu.Menu>
    )
  }

  getLoginRightMenu() {
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

  getLoggedRightMenu() {
    return (
      <Menu.Menu position='right'>
        <MenuItemLink to='/login'>
          <Button>Logout</Button>
        </MenuItemLink>
      </Menu.Menu>
    )
  }

  render() {
    const { isLogged } = this.props;
    const leftElements = isLogged ? this.getLoggedLeftMenu() : this.getLoginLeftMenu();
    const rightElements = isLogged ? this.getLoggedRightMenu() : this.getLoginRightMenu();

    return (
      <Menu stackable borderless>
        <MenuItemLink header to='/' onlyActiveOnIndex>
          {APP_NAME}
        </MenuItemLink>

        { leftElements }
        { rightElements }
      </Menu>
    );
  }
}
