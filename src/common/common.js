import React from 'react';
import axios from 'axios';
import hasha from 'js-sha512';

import TextField from 'material-ui/TextField'

//쿠키 구하기
export function getCookie(name) {

    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");

    let data = parts.pop().split(";").shift();

    if (data === "") {

        return;
    }
    return JSON.parse(atob(data));
}
//clientId 생성하기
export function getDefaultSettingValue(type) {

    let api_url='';
    if(process.env.NODE_ENV === 'development'){
      api_url=  'http://localhost:8080';
    //   api_url = 'http://enjoeat.eland.co.kr:8080';
    }
    else {
      api_url = 'http://enjoeat.eland.co.kr:8080';
    //   console.log('------------------------운영서버--------------------')
    }
    axios.defaults.baseURL = api_url;
    // axios.defaults.baseURL = 'http://helpot.iptime.org:8080';



    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (mm < 10) {
        mm = "0" + mm;
    }
    if (dd < 10) {
        dd = "0" + dd;
    }
    let clientId;
    if(type==='WEB'){
        clientId="EFWSadminWeb" + yyyy + mm + dd;
        axios.defaults.headers.common['clientId'] = "Client " + hasha(clientId);
    }else if(type==='MOBILE'){
        
        clientId="EFWSadminMobile" + yyyy + mm + dd;
        axios.defaults.headers.common['clientId'] = "Client test"
    }
      
    
}
// 인풋 필드 템플릿
export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
)

export function Left(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0, n);
}
export function Right(str, n) {
    
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
}


