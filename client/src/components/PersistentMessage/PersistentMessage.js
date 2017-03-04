import React, { PropTypes } from 'react';
import { Message } from 'semantic-ui-react';

import './PersistentMessage.scss';

class PersistentMessage extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        error: PropTypes.bool
    }

    render() {
        let {
            children,
            ...rest
        } = this.props;

        return (
            <div className="persistent-message">
                <Message
                    { ...rest }
                    header='Outch!!'
                    content={ children }
                />
            </div>
        );
    }
}

export default PersistentMessage;