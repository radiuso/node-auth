import React, { PropTypes } from 'react';
import { Message } from 'semantic-ui-react';

import './Message.scss';

class MessageComponent extends React.Component {
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
            <div className="message-container">
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

export default MessageComponent;