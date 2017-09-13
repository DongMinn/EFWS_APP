import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { LoginView } from '../components';
import { connect } from 'react-redux';
import { loginRequest, loginFailure } from '../actions/authentication';
import { browserHistory } from 'react-router';
import hasha from 'js-sha512';
import axios from 'axios';



class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(id, password) {
        return this.props.loginRequest(id, hasha(password)).then(
            () => {
                if (this.props.loginStatus.status === "SUCCESS") {
                    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
                    
                    let loginData = {
                        isLoggedIn: true,
                        id: id,
                        password: hasha(password),//비번도 암호화 해서 쿠키에 저장하도록 수정
                        token: this.props.value.token
                    };
               
                    axios.defaults.headers.common['authorization'] = loginData.token;
                    //쿠키저장

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                  
                    // browserHistory.push('/reservationstate');
                    browserHistory.push('/reservationstate');
                    return true;
                } else {
                    this.props.loginFail();
                    return false;
                }
            }
        )
    }

    render() {
        return (
            <div>
           
                 <LoginView
                    mode={true}
                    loginStatus={this.props.loginStatus.status}
                    onLogin={this.handleLogin} 
                    isLoggedIn = {this.props.status.isLoggedIn}
                  
                    />
            
            </div>
        );
    }
}
// eslint-disable-next-line
Login.propTypes = {

};
const mapStateToProps = (state) => {
    return {
        loginStatus: state.authentication.login,
        value: state.authentication.value,
        status: state.authentication.status,
    };                                                                                 
};
const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, password) => {
            return dispatch(loginRequest(id, password))
        },
        loginFail: () => { dispatch(loginFailure()) }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);