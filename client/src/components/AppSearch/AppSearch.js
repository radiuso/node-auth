import React from 'react';
import { Input } from 'semantic-ui-react';

class AppSearch extends React.Component {
    handleSearch(e) {
        const value = e.target.value;
        console.log(value);
    }

    render() {
        return (
            <Input action={{ icon: 'search' }} placeholder='Search...' />
        );
    }
}

export default AppSearch;
// const mapStateToProps = function(store) {
//   return {
//     auth: store.authState
//   };
// };


// export default connect(mapStateToProps)(AppSearch);
