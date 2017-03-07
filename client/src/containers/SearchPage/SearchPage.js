import React from 'react';
import { connect } from 'react-redux';

class SearchPage extends React.Component {
  render() {
    return (
      <div className="search">
        Searching for "{ this.props.searchValue }"...
      </div>
    );
  }
}


const mapStateToProps = function(store, ownProps) {
  return {
    searchValue: ownProps.params.value
  };
};

export default connect(mapStateToProps)(SearchPage);