import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { ChangeInformationView } from '../components';
import { connect } from 'react-redux';
import { changeStoreInformationRequest , getStoreInformationRequest ,setCurrentInform , loginRequest  } from '../actions/authentication';
import { getCookie } from '../common/common';
import axios from 'axios';

import { logSaveRequest } from '../common/log'

class ChangeInformation extends Component {
    constructor(props) {
        super(props);
        
        this.handleGetInform = this.handleGetInform.bind(this);
        this.handleChangeInform = this.handleChangeInform.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        // this.checkJWT = this.checkJWT.bind(this);
    }
    // checkJWT() {
    //     let loginData = getCookie('key');
        
        
    //     if (typeof loginData === "undefined" || !loginData.isLoggedIn) return;
    //     axios.defaults.headers.common['authorization'] = loginData.token;
    //     this.props.setCurrentInform(loginData.id, loginData.isLoggedIn, loginData.token);
    //     this.props.getStatusRequest().then(
    //         response => {
    //             if (!response) {
    //                 this.handleLogin(loginData.id, loginData.password)
    //             }else{
    //                 this.handleGetInform(this.props.value.currentId);
    //             }
    //         }
    //     )
    // }
    handleLogin(id, password) {
        return this.props.loginRequest(id, password).then(
            () => {
                if (this.props.loginStatus.status === "SUCCESS") {
                    //document.cookie = '';
                    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

                    // console.log('DEBUG: changePassword 로그인 직전 쿠키');
                    // console.log(document.cookie);
                    let loginData = {
                        isLoggedIn: true,
                        id: id,
                        password: password,//비번도 암호화 해서 쿠키에 저장하도록 수정
                        token: this.props.value.token
                    };
                    // console.log('DEBUG: changePassword 새로고침 토큰값');
                    // console.log(this.props.value.token);
                    axios.defaults.headers.common['authorization'] = loginData.token;
                    //쿠키저장
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    this.handleGetInform(this.props.value.currentId);
                    // console.log('DEBUG: 재 로그인시 쿠키값');
                    // console.log(document.cookie);
                    return true;
                }
                else {
                    return false;
                }
            }
        )
    }
    
    handleChangeInform(id, plantName , plantTelNo, description) {
        
        logSaveRequest('DEBUG' , '['+id+'][ChangeInformation Button Click Event: Save Click' ); 

        return this.props.changeStoreInformRequest(id, plantName , plantTelNo , description).then(
            (response)=>{
                //성공적으로 변경되었을 시 
                if(response===true){
                    // console.log('changeInformation.js : 매장 정보변경 완료');                    
                    return true;
                }else if(response===-1){
                    let loginData = getCookie('key');
                    return this.handleLogin(loginData.id, loginData.password).then(
                        response =>{
                            if(response){
                               return this.props.changeInformRequest(id, plantName , plantTelNo , description);
                            }
                        }
                    )
                }else{
                    // console.log('changeInformation.js : 정보변경 실패');
                    return false;
                }
            }
        );

    };
    handleGetInform(id) {
      
        return this.props.getStoreInformRequest(id).then(
            ()=>{
              
                // console.log(this.props.value)
            }
        )
    };
    componentDidMount() {
        
    }
    
    componentWillMount() {
        let loginData = getCookie('key');
        
       
         if (typeof loginData === "undefined" || !loginData.isLoggedIn) return;
         axios.defaults.headers.common['authorization'] = loginData.token;
         this.handleGetInform(this.props.value.currentId);
        // this.checkJWT();
        
    }
    
    render() {
        let isAuth = this.props.informStatus.isLoggedIn
        return (
            <div>
                {
                    isAuth?<ChangeInformationView mode={false}
                    onChangeInform={this.handleChangeInform} 
                    loginValue={this.props.value}              
                    />: undefined
                }               
            </div>
        );
    }
}
//이부분에 매장정보 가져오는 부분 넣고 , 변경하는 부분 호출 하고 
const mapStateToProps = (state) => {
    return {
        informStatus: state.authentication.status,
        value: state.authentication.value,
        loginStatus: state.authentication.login
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeStoreInformRequest: (id, userRealName,plantTelNo, description) => {
            return dispatch(changeStoreInformationRequest(id, userRealName,plantTelNo ,description))
        },
        getStoreInformRequest: (id) => {
            return dispatch(getStoreInformationRequest(id))
        },
        // getStatusRequest: () => {
        //     return dispatch(getStatusRequest());
        // },
        loginRequest: (id, password) => {
            return dispatch(loginRequest(id, password))
        },
        setCurrentInform: (id, isLoggedIn, token) => {
            dispatch(setCurrentInform(id, isLoggedIn, token))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeInformation);