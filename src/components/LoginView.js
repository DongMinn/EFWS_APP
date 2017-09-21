import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';

import { LoginField } from '../common/model';
import { renderTextField } from '../common/common';
import { required, maxLength15 } from '../common/validation';
import { browserHistory } from 'react-router';
import SweetAlert from 'sweetalert-react';
import '../css/sweetalert.scss';
import '../css/login.scss';


class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false
        };
        //터치드 되었는지 확인
        //redux-form  사용 예시
        this.handleLogin = this.handleLogin.bind(this);
        // this.handleRedirect = this.handleRedirect.bidn(this);
    }
    // handleRedirect(){
    //     setTimeout( browserHistory.push('/'),5000);
    // }
    handleLogin(values) {
        let id = values.id;
        let password = values.password;

        this.props.onLogin(id, password).then(
            (success) => {
                //로그인 실패했을경우
                if (!success) {
                    this.setState({
                        status: true
                    });
                }
            }
        );
        //이 부분은 다시 확인 해볼 것
        if (this.props.loginStatus === "FAILURE") {

            // throw new SubmissionError({
            //     _error: 'Login failed!'
            // })
        }
    };
    render() {
        //리덕스 폼사용하기 위해 초기값 세팅
        const { submitting, pristine, reset, handleSubmit, error } = this.props;

        const loginView = (
            //리덕스 폼에서 제공하는 핸들 서브밋에 내가 만든 로그인 함수를 넣어주어야 함.
            <form onSubmit={handleSubmit(this.handleLogin)}>
                <div>
                    {

                        LoginField.map((option, i) =>
                            <div key={i}>
                                <Field
                                    {...option}
                                    component={renderTextField}
                                    validate={[required, maxLength15]}
                                />
                            </div>
                        )
                    }
                </div>
                {error && <strong>{error}</strong>}
                <div>
                    <RaisedButton type="submit" primary={true} disabled={submitting}>로그인</RaisedButton>

                    <RaisedButton type="button" disabled={pristine || submitting} onClick={reset}>
                        초기화
                    </RaisedButton>
                </div>
            </form>
        );
        const loggedinView = (
            <div>
                <h1>
                    정상 로그인 되었습니다.
               </h1>
                <h4>
                    예약확인버튼을 누르세요.
                </h4>
            </div>
        );
        const loggedFailedView = (
            <div>
                <SweetAlert
                    show={this.state.status}
                    title="로그인 실패!"
                    text="아이디 혹은 비밀번호를 확인하세요"
                    onConfirm={() => this.setState({ status: false })}
                />
            </div>
        )
        return (
            <div className="App">

                <div>
                    {this.props.isLoggedIn ? undefined : loggedFailedView}
                </div>
                <div>
                    {this.props.isLoggedIn ? loggedinView : loginView}
                </div>


            </div>
        );
    }
}

LoginView.propTypes = {
    onLogin: PropTypes.PropTypes.func,
    onChangePwd: PropTypes.PropTypes.func

};
LoginView.defaultProps = {  
    loginStatus: {},
    onLogin: (id, password) => { console.error("login func not defined") },
};

// Login = connect(
//     state => {

//     })(Login);
LoginView = connect()(LoginView);
LoginView = reduxForm({
    form: 'submitValidation' 
})(LoginView);

export default LoginView;