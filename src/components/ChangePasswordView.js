import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { renderTextField } from '../common/common';
import { required } from '../common/validation';
import { ChangePasswordField } from '../common/model';

import RaisedButton from 'material-ui/RaisedButton';
import { styles } from '../common/styles';
import SweetAlert from 'sweetalert-react';
import '../css/sweetalert.scss';

class ChangePasswordView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginValue: {},
            failStatus: false,
            successStatus: false
        }
        this.handleChangePwd = this.handleChangePwd.bind(this);

    }
    handleChangePwd(values) {
        //let id = this.props.status.currentId;
        let id = this.props.loginValue.currentId;
        let password = values.password;
        let newPassword = values.newPassword;

        if (values.newPassword !== values.checkedPassword) {
            throw new SubmissionError({
                checkedPassword: 'Wrong password',
                // _error: '신규비밀번호 다시 확인 해주세요!'
            })
        }
        this.props.onChangePwd(id, password, newPassword).then(
            response => {
                
                const newState = response ? { successStatus: true } : { failStatus: true };
                this.setState(newState);
            })
    };
    componentWillReceiveProps(nextProps) {
        this.setState({
            loginValue: nextProps.loginValue
        })
    };


    render() {

        const { submitting, pristine, reset, handleSubmit, error } = this.props;

        const editView = (
            <form style={styles.form} onSubmit={handleSubmit(this.handleChangePwd)}>
                <div>
                    <div>
                        {
                            ChangePasswordField.map((option, i) =>
                                <div key={i}>
                                    <Field
                                        name={option.name}
                                        type='password'
                                        component={renderTextField}
                                        label={option.label}
                                        validate={[required]}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
                {error && <strong>{error}</strong>}
                <div>
                    <RaisedButton primary={true} type="submit" disabled={submitting}> 저장 </RaisedButton>
                    <RaisedButton type="button" disabled={pristine || submitting} onClick={reset}>
                        초기화
                    </RaisedButton>
                </div>
            </form>

        );
        const changeFailedView = (
            <div>
                <SweetAlert
                    show={this.state.failStatus}
                    title="비밀번호 변경 실패!"
                    text="기존 비밀번호를 확인하세요"
                    onConfirm={() => this.setState({ failStatus: false })}
                />
            </div>
        );
        const changeSuccessedView = (
            <div>
                <SweetAlert
                    show={this.state.successStatus}
                    title="비밀번호 변경 완료!"
                    text="다시 로그인 해 주세요"
                    onConfirm={() => {

                        this.setState({ successStatus: false });
                        this.props.logoutRequest();
                        browserHistory.push('/login');
                    }}
                />
            </div>
        );
        return (
            <div>
                <div>
                
                    {!this.state.successStatus ? changeFailedView : undefined}
                </div>
                <div>
                    {!this.state.failStatus ? changeSuccessedView : undefined}
                </div>
                <div>
                    {this.props.mode ? editView : undefined}
                </div>
            </div>
        );
    }
}

ChangePasswordView.propTypes = {

};


ChangePasswordView.propTypes = {
    mode: PropTypes.PropTypes.bool,
    onLogin: PropTypes.PropTypes.func,
    onChangePwd: PropTypes.PropTypes.func

};
ChangePasswordView.defaultProps = {
    mode: true,
    loginStatus: {},
    onChangePwd: (id, password) => { console.error("onChangePwd func not defined") },
    onChangeInform: () => { console.error("onChangeInform func not defined") }
};

ChangePasswordView = reduxForm({
    form: 'passWordChange' // a unique identifier for this form
})(ChangePasswordView);
ChangePasswordView = connect(
)(ChangePasswordView);
// Authentication = connect()(Authentication);
export default ChangePasswordView;
