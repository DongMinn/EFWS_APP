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
        this.handleLinkToLogin = this.handleLinkToLogin.bind(this);
    }

    componentWillMount() {
        this.handleLinkToHome();
    }

    handleLinkToHome() {
        browserHistory.push('/reservationstate');
        
    };
    handleLinkToLogin() {
        browserHistory.push('/');
        
    };
    render() {

        const loginButton = (
            <div>
                
                <FlatButton type="button" onClick={this.handleLinkToLogin}>Login</FlatButton>
            </div>
        );
        const logoutButton = (
            <div>
                <FlatButton type="button" onClick={this.handleLinkToHome}>새로고침</FlatButton>
                <FlatButton type="button" onClick={this.props.onLogout}>Logout</FlatButton>
            </div>
        );
        return (
            <div>
                <div>
                    <AppBar
                        // title={<span onTouchTap={this.handleLinkToHome}>Home</span>}
                        title={<span style={styles.title}>ENJO E:AT</span>}
                        // onTitleTouchTap={this.handleLinkToHome}
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


