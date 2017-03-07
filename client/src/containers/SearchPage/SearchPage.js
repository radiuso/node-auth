import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';

import { Item, Button } from 'semantic-ui-react';

import { fetchThings } from '../../actions/thingActions';

/**
 * TODO add componentWillReceiveProps lifecycle function to refresh on the fly the things list
 */
class SearchPage extends React.Component {

  componentWillMount() {
    fetchThings();
  }

  getThingsComponent() {
    const searchValue = this.props.searchValue.toUpperCase();
    const filteredThings = filter(this.props.things, (thing) => {
      return thing.name.toUpperCase().indexOf(searchValue) > -1 
        || thing.info.toUpperCase().indexOf(searchValue) > -1;
    });

    const thingsElements = filteredThings.map((thing) => {
      return (
        <Item key={ thing._id }>
          <Item.Image size='tiny' src='http://semantic-ui.com/images/wireframe/image.png' />
          <Item.Content>
            <Item.Header as='a'>{ thing.name }</Item.Header>
            <Item.Description>
              { thing.info }
            </Item.Description>
            <Item.Extra>
              <Button>
                Action
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      )
    });

    return (
      <Item.Group divided>
        { thingsElements }
      </Item.Group>
    );
  }

  render() {
    const thingsComponent = this.getThingsComponent();

    return (
      <div className="search">
        Searching for "{ this.props.searchValue }"...
        <br />
        { thingsComponent }
      </div>
    );
  }
}


const mapStateToProps = function(store, ownProps) {
  return {
    searchValue: ownProps.params.value,
    things: store.thingsState
  };
};

export default connect(mapStateToProps)(SearchPage);