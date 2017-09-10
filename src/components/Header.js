import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';


import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import { styles } from '../common/styles';

import '../css/common.scss';


class Header extends Component {
    constructor(props) {
        super(props)

        this.handleLinkToHome = this.handleLinkToHome.bind(this);
          }
    
    componentWillMount() {
        this.handleLinkToHome();
    }
    
    handleLinkToHome() {
        browserHistory.push('/');
        console.log('link')
    };

    
    render() {

        const loginButton = (
            <FlatButton type="button" onClick={this.handleLinkToHome}>Login</FlatButton>
        );
        const logoutButton = (

            <FlatButton type="button" onClick={this.props.onLogout}>Logout</FlatButton>
        );
        return (
            <div>
                <div>
                    <AppBar
                        // title={<span onTouchTap={this.handleLinkToHome}>Home</span>}
                        title={<span style={styles.title}>Home</span>}
                        onTitleTouchTap={this.handleLinkToHome}
                        showMenuIconButton={false}
                        iconElementRight={this.props.isLoggedIn ? logoutButton : loginButton}
                    />
                </div>
                
            </div>
        );
    }
}

Header.propTypes = {
    isLoggedIn: PropTypes.PropTypes.bool,
    onLogout: PropTypes.PropTypes.func
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined"); }
};

export default Header;


