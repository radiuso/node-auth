import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import { hasAccessTo } from '../../utils/restrictedArea';

import './MenuItemLink.scss';
class MenuItemLink extends React.Component {
    static propTypes = {
        children: React.PropTypes.node,
        to: React.PropTypes.string.isRequired,
        header: React.PropTypes.bool
    }

    render() {
        const {
            to,
            children,
            header,
            ...rest
        } = this.props;

        if(hasAccessTo(to)) {
            const linkClassNames = classNames(
                'item',
                'menu-item-link',
                { 'header': header }
            );

            return (
                <Link 
                    to={to} 
                    className={linkClassNames} 
                    activeClassName="active" 
                    {...rest}
                >
                    {children}
                </Link>
            );
        } else {
            return null;
        }
    }
}


export default MenuItemLink;