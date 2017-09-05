import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';


import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { styles } from '../common/styles';

import '../css/common.scss';


class Header extends Component {
    constructor(props) {
        super(props)

        this.handleLinkToHome = this.handleLinkToHome.bind(this);
        this.handleLinkToReservation = this.handleLinkToReservation.bind(this);
        this.handleLinkToChangeInform= this.handleLinkToChangeInform.bind(this);
    }
    
    componentWillMount() {
        this.handleLinkToHome();
    }
    
    handleLinkToHome() {
        browserHistory.push('/');
        console.log('link')
    };

    handleLinkToReservation() {
        browserHistory.push('/reservationstate')
    }
    handleLinkToChangeInform(state){
       if(state==='password'){
            browserHistory.push('/change/password')
       }else if(state==='information'){
           browserHistory.push('/change/information')
       }else {
            browserHistory.push('/change/setting')
       }
        
    }
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
                <div className="common_header">
                    {this.props.isLoggedIn ?
                        <Paper style={styles.paper}>
                            <Menu>
                                <MenuItem primaryText="예약확인" onClick={this.handleLinkToReservation} />
                                
                                <MenuItem
                                    primaryText="정보수정"
                                    checked={false}
                                    rightIcon={<ArrowDropRight />}
                                    menuItems={[
                                        <MenuItem primaryText="비밀번호변경"  checked={false} onClick={()=>{this.handleLinkToChangeInform('password')}}/>,
                                        <MenuItem primaryText="매장정보변경" checked={false} onClick={()=>{this.handleLinkToChangeInform('information')}}/>,
                                        <MenuItem primaryText="Settings"  checked={false} onClick={()=>{this.handleLinkToChangeInform('setting')}}/>,
                                    ]}
                                /> 
                            </Menu>                                                                                                                                          
                        </Paper>
                        : undefined
                    }
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


