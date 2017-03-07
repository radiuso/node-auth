import React from 'react';
import { Input, Icon } from 'semantic-ui-react';
import { browserHistory } from 'react-router'

/**
 * TODO set searchValue to store
 */
class AppSearch extends React.Component {
    state = {
        searchValue: ""
    };

    handleChange(e) {
        this.setState({
            searchValue: e.target.value
        });
    }

    handleKeyPress(target) {
        if (target.charCode === 13) {
            this.search();
        }
    }

    handleClick() {
        this.search();
    }

    search() {
        if(this.state.searchValue !== '') {
            browserHistory.push('/search/'+this.state.searchValue);
        }
    }

    render() {
        return (
            <Input 
                placeholder='Search...'
                ref={ (input) => this.appSearchInput = input }
                action={{ icon: 'search' }} 
                value={ this.state.searchValue }
                onChange={ this.handleChange.bind(this) }
                onKeyPress={ this.handleKeyPress.bind(this) } 
                icon={<Icon name='search' onClick={ this.handleClick.bind(this) } />}
            />
        );
    }
}

export default AppSearch;
