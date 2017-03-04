import React from 'react';
import classNames from 'classnames';

import './PersistentMessage.scss';

export default ({ type, children }) => {
    const persistentClasses = classNames(
        'persistent-message',
        {
            'persistent-message--error': type === 'error'
        }
    );

    return (
        <div className={persistentClasses}>
            <p>
                {children}
            </p>
        </div>
    );
}