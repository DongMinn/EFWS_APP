import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import SweetAlert from 'sweetalert-react';
import { renderToStaticMarkup } from 'react-dom/server';
import { SampleComponent } from '../../components';

import '../../css/reserve.scss';
import { styles } from '../../common/styles';

class ReservationStateTestView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reserveData: [],
            show: false,
            dialogOpen: false,
            reserve: {},
            reserveState: '',
            putDataShow: false
        }
        this.handleConfirmState = this.handleConfirmState.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleAlertText = this.handleAlertText.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleChangeReserve = this.handleChangeReserve.bind(this);
        this.handleChnageReserveRequest = this.handleChnageReserveRequest.bind(this);
        this.handleLabel = this.handleLabel.bind(this);

    }
    handleChnageReserveRequest() {

        this.handleOpenDialog();
        this.props.onUpdateReserveState(this.state.reserve, 'CANCEL').then(
            response => {
                if (response) {
                    this.props.onPutReserveData(this.state.reserve).then(
                        response => {
                            response ? this.setState({ putDataShow: true }) : this.setState({ putDataShow: false })
                        }
                    )
                }
            }
        )
    }
    handleChangeReserve(event, index, value) {
        let tmpState = this.state.reserve;
        let newState = {
            ...tmpState,
            tableType: value
        }
        this.setState({ reserve: newState });
    }
    handleInputValue(value) {
        let tmpState = this.state.reserve;
        let newState = {
            ...tmpState,
            tableType: value
        }
        this.setState({ reserve: newState })
    }
    handleOpenDialog() {
        if (this.state.dialogOpen === false) {
            this.setState({ dialogOpen: true })
        }
        else {
            this.setState({ dialogOpen: false })
        }
    }
    handleAlertText() {
        if (this.state.reserveState === 'NOSHOW') {
            return 'NoShow로 상태변경 하시겠습니까?'
        } else if (this.state.reserveState === 'ENTRANCE') {
            return '입장으로 상태변경 하시겠습니까?'
        } else if (this.state.reserveState === 'CALL') {
            return 'CALL(알림톡전송) 상태변경 하시겠습니까?'
        } else if (this.state.reserveState === 'MODI') {
            return '예약 수정 하시겠습니까?'
        } else {
            return '예약 삭제 하시겠습니까?'
        }
    }
    handleColorChange(state) {
        let upperState = state.toUpperCase();
        if (upperState === 'CALL') {
            return '#3F51B5'
        }
        else if (upperState === 'WAIT') {
            return '#2196F3'
        }
        else if (upperState === 'ENTRANCE') {
            return '#c1ffff'
        } else if (upperState === 'NOSHOW') {
            return '#FFCCBC'
        } else {
            return '#FF1744'
        }
    }
    handleConfirmState(reserve, state) {

        if (state === 'WAIT') {
            this.props.onUpdateReserveState(reserve, state)
        } else if (state === 'MODI') {
            this.handleOpenDialog();
            this.setState({
                reserve: reserve,
                reserveState: state
            })
        }
        else {
            this.setState({
                show: true,
                reserve: reserve,
                reserveState: state
            })
        }
    }
    handleLabel(waitingState) {
        if (waitingState.toUpperCase() === 'RESERVATION') {
            return '예약'
        } else if (waitingState.toUpperCase() === 'CALL') {
            return 'CALL'
        } else {
            return '대기'
        }
    }



    render() {
        const reservateView = (
            <div>
                <Card style={styles.card}>
                    <Badge
                        badgeStyle={styles.badge}
                        badgeContent={this.props.reserveData.alarmtalkCount}
                        primary={true}
                    >
                        <NotificationsIcon />
                    </Badge>
                    <CardHeader
                        title={this.handleLabel(this.props.reserveData.waitingState)}
                        titleStyle={styles.cardHeader}
                        subtitle={'고객번호: '+ this.props.CellPhone}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardActions>

                        <FlatButton backgroundColor={this.handleColorChange(this.props.reserveData.waitingState)} label={this.props.reserveData.tableType + '인 테이블'} style={styles.reserveState} disabled={true}></FlatButton>
                        <FlatButton backgroundColor={'##FAFAFA'} label={'예약시간: ' + this.props.reserveData.reservationOrderTime} style={styles.reserveState} disabled={true}></FlatButton>

                    </CardActions>
                    <CardActions>
                        <RaisedButton style={styles.callButton} onClick={() => { this.handleConfirmState(this.props.reserveData, 'CALL') }}>CALL</RaisedButton>
                        <RaisedButton style={styles.enterButton} onClick={() => { this.handleConfirmState(this.props.reserveData, 'ENTRANCE') }}>입장</RaisedButton>
                    </CardActions>

                    <CardText expandable={true}>
                        <RaisedButton style={styles.reserveButtonUpdate} onClick={() => { this.handleConfirmState(this.props.reserveData, 'NOSHOW') }}>NO-SHOW</RaisedButton>
                        <span> </span>
                        <RaisedButton style={styles.reserveButtonUpdate} onClick={() => { this.handleConfirmState(this.props.reserveData, 'MODI') }}>수정</RaisedButton>
                        <span> </span>
                        <RaisedButton style={styles.reserveButtonDelete} onClick={() => { this.handleConfirmState(this.props.reserveData, 'CANCEL') }} >삭제</RaisedButton>
                        <br/>
                      예약번호: {this.props.reserveData.reservationNo}/{this.props.reserveData.customerCellphone}
                    </CardText>
                </Card>
            </div>

        )
        const DialogView = (
            <div>
                <Dialog
                    style={styles.sweetAlert}
                    title='예약 상태 수정'
                    actions={[
                        <RaisedButton
                            backgroundColor='#C1C1C1'
                            label="Cancel"
                            onTouchTap={this.handleOpenDialog}
                        />,
                        <RaisedButton
                            backgroundColor='#8CD4F5'
                            label="Ok"
                            onTouchTap={this.handleChnageReserveRequest}
                        />,
                    ]}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleOpenDialog}
                >
                    수정시 기존 예약은 삭제처리 됩니다.
                    <br />
                    테이블 타입 :
                    <DropDownMenu value={this.state.reserve.tableType} onChange={this.handleChangeReserve}>
                        <MenuItem value={'2'} primaryText="2인테이블" />
                        <MenuItem value={'4'} primaryText="4인테이블" />
                        <MenuItem value={'6'} primaryText="6인테이블" />
                        <MenuItem value={'8'} primaryText="8인테이블" />
                        <MenuItem value={'9'} primaryText="9인테이블" />
                    </DropDownMenu>
                </Dialog>

            </div>
        )
        // const DialogView2 = (
        //     <div>
        //         <SweetAlert
        //             show={this.state.dialogOpen}
        //             title='예약 상태 수정'
        //             text={renderToStaticMarkup(<SampleComponent type={'hihi'} />)}
        //             showCancelButton
        //             html='true'
        //             onConfirm={inputValue => {
        //                 this.handleInputValue(inputValue);
        //                 this.handleChnageReserveRequest();
        //                 this.setState({
        //                     dialogOpen: false,
        //                 });
        //             }}
        //             onClose={() => console.log('close')} // eslint-disable-line no-console
        //         >
        //         </SweetAlert>
        //     </div>
        // )
        const reserveStateConfirmView = (
            <div>
                <SweetAlert
                    show={this.state.show}
                    title="예약 상태 변경"
                    text={this.handleAlertText()}
                    showCancelButton
                    onConfirm={() => {
                        this.props.onUpdateReserveState(this.state.reserve, this.state.reserveState)
                        this.setState({
                            show: false,
                            reserve: {},
                            reserveState: ''
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            show: false,
                            reserve: {},
                            reserveState: ''
                        });
                    }}
                    onClose={() => console.log('close')} // eslint-disable-line no-console
                />
            </div>
        );
        const reservePutConfrimView = (
            <div>
                <SweetAlert
                    show={this.state.putDataShow}
                    title='예약 변경 완료'
                    text='예약 데이터 변경 완료되었습니다.'
                    showCancelButton
                    onConfirm={() => {
                        this.setState({
                            putDataShow: false,
                        });

                    }}
                    onClose={() => console.log('close')} // eslint-disable-line no-console
                />
            </div>
        );
        // const reserveView = (
        //     <div>
        //         {
        //             <div >
        //                 <div id="reserveStateView">
        //                     <div>
        //                         <FlatButton backgroundColor={this.handleColorChange(this.props.reserveData.waitingState)} style={styles.reserveState}
        //                             label={this.handleLabel(this.props.reserveData.waitingState)} disabled={true}>
        //                         </FlatButton>
        //                     </div>
        //                     <div id="reserveStateView1">
        //                         <FlatButton backgroundColor='##FAFAFA' label={this.props.reserveData.tableType} style={styles.reserveState} disabled={true}>TableType</FlatButton>
        //                         <RaisedButton style={styles.callButton} onClick={() => { this.handleConfirmState(this.props.reserveData, 'CALL') }}>CALL</RaisedButton>
        //                         <RaisedButton style={styles.waitButton} onClick={() => { this.handleConfirmState(this.props.reserveData, 'WAIT') }}>대기</RaisedButton>
        //                         <RaisedButton style={styles.enterButton} onClick={() => { this.handleConfirmState(this.props.reserveData, 'ENTRANCE') }}>입장</RaisedButton>
        //                         <RaisedButton style={styles.noshowButton} onClick={() => { this.handleConfirmState(this.props.reserveData, 'NOSHOW') }}>NO-SHOW</RaisedButton>
        //                     </div>
        //                     <div>
        //                         핸드폰번호: {this.props.reserveData.customerCellphone}/{this.props.reserveData.reservationNo}/  예약시간:{this.props.reserveData.reservationOrderTime}
        //                     </div>
        //                 </div>
        //                 <div id="reserveStateView2">
        //                     <RaisedButton style={styles.reserveButtonUpdate} onClick={() => { this.handleConfirmState(this.props.reserveData, 'MODI') }}>수정</RaisedButton>
        //                     <RaisedButton style={styles.reserveButtonDelete} onClick={() => { this.handleConfirmState(this.props.reserveData, 'CANCLE') }} >삭제</RaisedButton>
        //                 </div>

        //             </div>
        //         }
        //     </div>
        // );
        return (
            <div>
                <div>
                    {reservateView}
                    <br />
                </div>
                <div className="reserve" id="reserveStateView">
                    <div>
                        {DialogView}
                        {reserveStateConfirmView}
                        {reservePutConfrimView}

                    </div>
                </div>
            </div>
        );
    }
}

ReservationStateTestView.propTypes = {

};

export default ReservationStateTestView;