import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { ChangePasswordView } from '../components';
import { connect } from 'react-redux';
import { checkPasswordRequest, changePasswordRequest, logout, getStatusRequest, loginRequest , setCurrentInform } from '../actions/authentication';
import { getCookie } from '../common/common';
import axios from 'axios';

import { logSaveRequest } from '../common/log'

class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.handleChangePwd = this.handleChangePwd.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.checkJWT = this.checkJWT.bind(this);
    }
    checkJWT() {
        let loginData = getCookie('key');
       
      
        if (typeof loginData === "undefined" || !loginData.isLoggedIn) return;
        axios.defaults.headers.common['authorization'] = loginData.token;
        this.props.setCurrentInform(loginData.id, loginData.isLoggedIn, loginData.token);
        this.props.getStatusRequest().then(
            response => {
                if (!response) {
                    this.handleLogin(loginData.id, loginData.password)
                }
            }
        )
    }
    handleLogin(id, password) {
        return this.props.loginRequest(id, password).then(
            () => {
                if (this.props.loginStatus.status === "SUCCESS") {
                    //document.cookie = '';
                    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

                    let loginData = {
                        isLoggedIn: true,
                        id: id,
                        password: password,//비번도 암호화 해서 쿠키에 저장하도록 수정
                        token: this.props.value.token
                    };
                    
                    axios.defaults.headers.common['authorization'] = loginData.token;
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    return true;
                }
                else {
                    return false;
                }
            }
        )
    }
    //비밀번호 변경하는 부분 코드 수정할수 있다면 수정해야 할 듯
    handleChangePwd(id, password, newPassword) {
        
        logSaveRequest('DEBUG' , '['+this.props.authData.currentId+'][ChangePassWord Button Click Event: Save Click' ); 

        return this.props.checkPasswordRequest(id, password).then(
            (response) => {
                if (response === -1) {
                    let loginData = getCookie('key');
                    return this.handleLogin(loginData.id, loginData.password).then(
                        (response) => {
                            if(response){
                                return this.props.checkPasswordRequest(id, password).then(
                                    (response)=>{
                                        if(response===true){
                                            return this.props.changePasswordRequest(id, password , newPassword).then(
                                                response=>{
                                                    
                                                    return response;
                                                }
                                            )
                                        }
                                    }
                                )
                            }
                        }
                    )
                }//비번확인이 성공했다면
                if (response===true && this.props.changePasswordStatus.checkPwd === "SUCCESS") {
                    //여기서 새 비번을 변경하는 함수를 다시 호출
                    
                    return this.props.changePasswordRequest(id, password, newPassword).then(
                        () => {
                            if (this.props.changePasswordStatus.changePwd === "SUCCESS") {
                                
                                return true;
                            } else {
                                
                                return false;
                            }
                        }
                    )
                }
            }
        )
    }

    componentWillMount() {
        // this.checkJWT();
        let loginData = getCookie('key');
        
       
         if (typeof loginData === "undefined" || !loginData.isLoggedIn) return;
         axios.defaults.headers.common['authorization'] = loginData.token;
         
        this.handleLogin(loginData.id, loginData.password)
    }

    render() {
        let isAuth = this.props.changePasswordStatus.isLoggedIn
        return (
            <div>
                {
                    isAuth ? <ChangePasswordView mode={true}
                        onChangePwd={this.handleChangePwd}
                        loginValue={this.props.value}
                        logoutRequest={this.props.logoutRequest}
                    />
                        : undefined
                }

            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        changePasswordStatus: state.authentication.status,
        value: state.authentication.value,
        loginStatus: state.authentication.login
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        checkPasswordRequest: (id, password) => {
            return dispatch(checkPasswordRequest(id, password))
        },
        changePasswordRequest: (id, password, newPassword) => {
            return dispatch(changePasswordRequest(id, password, newPassword))
        },
        logoutRequest: () => {
            dispatch(logout())
        },
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        loginRequest: (id, password) => {
            return dispatch(loginRequest(id, password))
        },
        setCurrentInform: (id, isLoggedIn, token) => {
            dispatch(setCurrentInform(id, isLoggedIn, token))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);