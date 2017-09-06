import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import SweetAlert from 'sweetalert-react';

class PlantInformAlarmSaveButtonView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            message: '',
            newStatus: false,
            successStatus: false
        }
        this.handleSaveAlarmData = this.handleSaveAlarmData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({
            show: true
        })
    }
    handleSaveAlarmData() {
        this.props.onUpdateAlarmData().then(
            response => {

                if (response === true) {
                    this.setState({ show: false, successStatus: true })
                } else {
                    this.setState({
                        show: false,
                        newStatus: true,
                        message:'시스템스에 문의하세요!'
                    })
                }
            }
        )

    }

    render() {
        const alarmTalkDataConfirmView = (
            <div>
                <SweetAlert
                    show={this.state.show}
                    title="알림톡세팅 변경"
                    text={'알림톡세팅을 저장 하시겠습니까?'}
                    showCancelButton
                    onConfirm={this.handleSaveAlarmData}
                    onCancel={() => {
                        this.setState({
                            show: false,
                        });
                    }}
                />
            </div>
        );
        const changeSuccessedView = (
            <div>
                <SweetAlert
                    show={this.state.successStatus}
                    title="알림톡 세팅 변경 성공"
                    text="알림톡 세팅 변경 완료 되었습니다!"
                    // text=""
                    onConfirm={() => {
                        this.setState({ successStatus: false });
                    }}
                />
            </div>
        );
        const changeFailedView = (
            <div>
                <SweetAlert
                    show={this.state.newStatus}
                    title="알림톡세팅 변경 실패"
                    text={this.state.message}
                    onConfirm={() => {
                        this.setState({ newStatus: false });
                        this.props.onGetAlarmData();
                    }}
                />
            </div>
        );
        return (
            <div>
                {alarmTalkDataConfirmView}
                {changeSuccessedView}
                {changeFailedView}
                <RaisedButton primary={true} onClick={this.handleClick}>저장</RaisedButton>

            </div>
        );
    }
}
export default PlantInformAlarmSaveButtonView;