import React, { PropTypes } from 'react';
import { Message } from 'semantic-ui-react';

import './PersistentMessage.scss';

class PersistentMessage extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        error: PropTypes.bool,
        errorCode: PropTypes.number
    }

    getHeader() {
        const { error, errorCode } = this.props;
        let header = '';

        if(error) {
            if(errorCode > 0) {
                header += errorCode + ' - ';
            }
            header += 'Outch!!';
        } else {
            header += 'Info';
        }   

        return header;
    }

    render() {
        const {
            children,
            error
        } = this.props;
        
        return (
            <div className="persistent-message">
                <Message
                    error={ error }
                    header={ this.getHeader() }
                    content={ children }
                />
            </div>
        );
    }
}

export default PersistentMessage;