import React, { PropTypes } from 'react';
import { Message } from 'semantic-ui-react';

import './PersistentMessage.scss';

class PersistentMessage extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        error: PropTypes.bool,
        warning: PropTypes.bool,
        code: PropTypes.number
    }

    getHeader() {
        const { error, warning, code } = this.props;
        let header = '';
        if(code > 0) {
            header += code + ' - ';
        }

        if(error) {
            header += 'Outch!!';
        } 
        else if(warning) {
            header += 'Warning';
        }
        else {
            header += 'Info';
        }   

        return header;
    }

    render() {
        const {
            children,
            error,
            warning
        } = this.props;
        
        return (
            <div className="persistent-message">
                <Message
                    error={ error }
                    warning={ warning }
                    header={ this.getHeader() }
                    content={ children }
                />
            </div>
        );
    }
}

export default PersistentMessage;