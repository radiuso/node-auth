import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import { fetchUsers } from '../../../actions/userActions';
import { setPageState } from '../../../actions/appActions';

class UserList extends Component {
  componentDidMount() {
    // fetch users
    fetchUsers();

    setPageState({
      isSearchable: true
    });
  }
  render() {
    let users = this.props.users.map((user, index) => (
      <Table.Row key={ user._id }>
        <Table.Cell>{ user.name }</Table.Cell>
        <Table.Cell>{ user.email }</Table.Cell>
        <Table.Cell>{ user.role }</Table.Cell>
      </Table.Row>
    ));

    return (
      <div className="userList">
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { users }
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    users: store.userState,
    app: store.appState
  };
};

export default connect(mapStateToProps)(UserList);
