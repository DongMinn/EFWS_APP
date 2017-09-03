import React, { Component } from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import { getDefaultSettingValue } from '../common/common';
import { getStatus } from '../actions/authentication';

class Change extends Component {
    componentDidMount() {

        //이 부분은 중복되는 부분으로 수정이 필요 함 더 간략히 할 필요가 있음
        getDefaultSettingValue('WEB');
        //    let loginData = getCookie('key');
        //로그인데이터 쿠키가 존재하면 그 안에 토큰 값을 글로벌 토큰값으로 .
        axios.defaults.headers.common['authorization'] = this.props.value.token;
        if (!this.props.isLoggedIn) return;
    }
    render() {
        return (
            <div>
               
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,
        value: state.authentication.value
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getStatus: () => {
            dispatch(getStatus())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Change);




// <ChangeRequest
//                     isLoggedIn={this.props.status.isLoggedIn}
//                 />