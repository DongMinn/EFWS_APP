import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { renderTextField } from '../common/common';
// import { required } from '../common/validation';
import { ChangeInfoField } from '../common/model';
import { load as loadData } from '../actions/accountInform';

import RaisedButton from 'material-ui/RaisedButton';
import NoteAdd from 'material-ui/svg-icons/action/system-update-alt';

import { styles } from '../common/styles';
import SweetAlert from 'sweetalert-react';
import '../css/sweetalert.scss';



class ChangeInformationView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginValue: this.props.loginValue,
            failStatus: false,
            successStatus: false
        }
        this.handleChangeInform = this.handleChangeInform.bind(this);

    }
    handleChangeInform(values) {
        //체인지인폼 호출
        let id = this.props.loginValue.currentId;
        let plantName = values.plantName;
        let plantTelNo = values.plantTelNo;
        let description = values.noticeDescription;

        // const{resetForm} = this.props;

        this.props.onChangeInform(id, plantName, plantTelNo, description).then(
            (response) => {

                //이건 뭔가 성능에 영향이 있다고 하니까.. 다시 알아봐야 할 듯 우선은 이걸로 리프레시
                const newState = response ? { successStatus: true } : { failStatus: true };
                this.setState(newState);
            }
        )
    };

    componentDidMount() {
        
    }
    componentWillReceiveProps(nextProps) {
        
        this.setState({
            loginValue: nextProps.loginValue
        })
    }
    componentWillUnmount() {
        //리덕스 폼 초기화 하는 방법을 아무리 써도 안됨....
        window.location.reload();
    }


    //load(this.props.loginValue)
    //const { submitting, pristine, reset, load, handleSubmit, error } = this.props;
    render() {
        const { handleSubmit, load, error, submitting, pristine, reset } = this.props;
        const editInfoView = (
            <form style={styles.form} onSubmit={handleSubmit(this.handleChangeInform)}>
                <br />
                <div>
                    <RaisedButton backgroundColor={'#00E676'} icon={<NoteAdd color="white" />} onClick={() => load(this.state.loginValue)}>정보불러오기</RaisedButton>
                </div>

                <div>
                    {
                        ChangeInfoField.map((option, i) =>
                            <div key={i}>
                                <Field name={option.name} type="text" component={renderTextField} label={option.label} />
                            </div>
                        )
                    }
                </div>
                {error && <strong>{error}</strong>}
                <div>
                    <RaisedButton primary={true} type="submit" disabled={submitting}>정보변경</RaisedButton>
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
                    title="매장 정보 변경실패!"
                    text="시스템스에 문의하세요."
                    onConfirm={() => this.setState({ failStatus: false })}
                />
            </div>
        );
        const changeSuccessedView = (
            <div>
                <SweetAlert
                    show={this.state.successStatus}
                    title="매장 정보 변경완료!"
                    text="매장 정보 변경되었습니다."
                    onConfirm={() => {

                        this.setState({ successStatus: false });
                        window.location.reload();
                        browserHistory.push('/change');
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
                    {this.props.mode ? undefined : editInfoView}
                </div>
            </div>
        );
    }
}
ChangeInformationView.propTypes = {
    mode: PropTypes.PropTypes.bool,
    onLogin: PropTypes.PropTypes.func

};
ChangeInformationView.defaultProps = {
    mode: true,
    loginStatus: {},
    onChangeInform: () => { console.error("onChangeInform func not defined") }
};



const mapDispatchToProps = (dispatch) => {
    return {
        load: (data) => { dispatch(loadData(data)) },

    };
};

ChangeInformationView = reduxForm({
    form: 'informationChange' ,// a unique identifier for this form
    enableReinitialize :true
})(ChangeInformationView);
ChangeInformationView = connect(
    state => ({
        initialValues: state.accountinform.data
    }),
    // {load : loadData}
    mapDispatchToProps
)(ChangeInformationView);
// Authentication = connect()(Authentication);
export default ChangeInformationView;
