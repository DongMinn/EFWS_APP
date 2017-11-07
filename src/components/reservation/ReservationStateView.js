import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

// import SweetAlert from 'sweetalert-react';
import '../../css/reserve.scss';
import { styles, labelStyles, dialogStyle } from '../../common/styles';



class ReservationStateTestView extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        this.handleReservationNo = this.handleReservationNo.bind(this);
        this.handleWaitingTime = this.handleWaitingTime.bind(this);
        this.handleTitleColor = this.handleTitleColor.bind(this);
        this.handleOrderTime = this.handleOrderTime.bind(this);

    }
    handleOrderTime() {
        let orderTime = this.props.reserveData.reservationOrderTime.split(' ');


        return '예약시간: ' + orderTime[1];
    }
    handleTitleColor() {
        let table = this.props.reserveData.reservationNo.substr(15, 4).substring(0, 1);
        if (table === '2') return 'red'
        else if (table === '4') return 'blue'
        else if (table === '6') return 'green'
        else return 'pink'

    }
    handleWaitingTime() {
        let regiDate = this.props.reserveData.reservationOrderTime.replace(/-/g, '/');;

        let regiTime = Date.parse(regiDate);
        let today = new Date();

        let gap = today.getTime() - regiTime;

        let minutes = 1000 * 60;

        let gap_m = Math.floor(gap / minutes);

        return '대기시간: ' + gap_m + ' 분';
    }
    handleReservationNo() {
        let no = this.props.reserveData.reservationNo;
        no = no.substr(15, 4)
        let table = no.substring(0, 1);

        return '[' + table + '인 테이블] [대기번호: ' + no + ']'
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
            return '#7E63DD'
        }
        else if (upperState === 'WAIT') {
            return '#6CF3A9'
        }
        else if (upperState === 'ENTRANCE') {
            return '#c1ffff'
        } else if (upperState === 'NOSHOW') {
            return '#FFCCBC'
        } else {
            return '#FF8A80'
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
        } else if (waitingState.toUpperCase() === 'WAIT') {
            return '입장대기'
        } else
            return '자동알림'
    }


    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.reserveData !== nextProps.reserveData) return true;
        if (this.props.CellPhone !== nextProps.CellPhone) return true;
        if (this.state.reserve !== nextState.reserve) return true;
        if (this.state.dialogOpen !== nextState.dialogOpen) return true;
        if (this.state.show !== nextState.show) return true;
        if (this.state.reserveState !== nextState.reserveState) return true;
        if (this.state.putDataShow !== nextState.putDataShow) return true;

        return false;

    }



    render() {

        const items = [];
        for (let i = 0; i < this.props.plantSettingList.length; i++) {

            if (this.props.plantSettingList[i].tableUseChk === 'Y') {
                items.push(<MenuItem value={this.props.plantSettingList[i].tableType} key={i} primaryText={`${this.props.plantSettingList[i].tableType} 인 테이블`} />);
            }
        }
        const reservateView = (
            <div>
                <Card style={styles.card}>

                    <CardHeader
                        title={this.handleReservationNo()}
                        titleColor={this.handleTitleColor()}
                        titleStyle={styles.cardHeader}
                        subtitle={'[고객번호: ' + this.props.CellPhone + '] [전체순번: ' + this.props.reserveData.orderInRemainingList + ']'}
                        actAsExpander={true}
                        showExpandableButton={true}
                    >
                        <Badge
                            badgeStyle={styles.badge}
                            badgeContent={this.props.reserveData.alarmtalkCount}
                            primary={true}
                        >
                            <NotificationsIcon />
                        </Badge>
                    </CardHeader>

                    <CardActions>

                        <FlatButton backgroundColor={this.handleColorChange(this.props.reserveData.waitingState)} label={this.handleLabel(this.props.reserveData.waitingState)} labelStyle={labelStyles.reservationInfoButton} style={styles.reserveState} disabled={true}></FlatButton>
                        <FlatButton backgroundColor={'##FAFAFA'} label={this.handleOrderTime()} style={styles.reserveState} labelStyle={labelStyles.reservationInfoButton} disabled={true}></FlatButton>
                        <FlatButton backgroundColor={'##FAFAFA'} label={this.handleWaitingTime()} style={styles.reserveState} labelStyle={labelStyles.reservationInfoButton} disabled={true}></FlatButton>

                    </CardActions>
                    <CardActions>
                        <RaisedButton style={styles.callButton} onClick={() => { this.handleConfirmState(this.props.reserveData, 'CALL') }}>CALL</RaisedButton>
                        <RaisedButton style={styles.enterButton} onClick={() => { this.handleConfirmState(this.props.reserveData, 'ENTRANCE') }}>입장</RaisedButton>
                        <RaisedButton style={styles.noshowButton} onClick={() => { this.handleConfirmState(this.props.reserveData, 'NOSHOW') }}>NO-SHOW</RaisedButton>
                    </CardActions>

                    <CardText expandable={true}>

                        <span> </span>
                        <RaisedButton style={styles.reserveButtonUpdate} onClick={() => { this.handleConfirmState(this.props.reserveData, 'MODI') }}>수정</RaisedButton>
                        <span> </span>
                        <RaisedButton style={styles.reserveButtonDelete} onClick={() => { this.handleConfirmState(this.props.reserveData, 'CANCEL') }} >삭제</RaisedButton>
                        <br />

                    </CardText>
                </Card>
            </div>

        )
        const DialogView = (
            <div>
                <Dialog
                    style={styles.sweetAlert}
                    titleStyle={dialogStyle.titleStyle}
                    title='예약 상태 수정'
                    actions={[
                        <FlatButton
                            primary={true}
                            // backgroundColor='#C1C1C1'
                            label="Cancel"
                            onTouchTap={this.handleOpenDialog}
                        />,
                        <FlatButton
                            primary={true}
                            // backgroundColor='#8CD4F5'
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
                        {items}
                    </DropDownMenu>
                </Dialog>

            </div>
        )
        const reserveStateConfirmView = (
            <div>
                <Dialog
                    style={styles.sweetAlert}
                    title="예약 상태 변경"
                    titleStyle={dialogStyle.titleStyle}
                    actions={[
                        <FlatButton
                            primary={true}
                            // backgroundColor='#C1C1C1'
                            label="Cancel"
                            onTouchTap={() => {
                                this.setState({
                                    show: false,
                                    reserve: {},
                                    reserveState: ''
                                });
                            }}
                        />,
                        <FlatButton
                            primary={true}
                            // backgroundColor='#8CD4F5'
                            label="Ok"
                            onTouchTap={() => {
                                this.props.onUpdateReserveState(this.state.reserve, this.state.reserveState)
                                this.setState({
                                    show: false,
                                    reserve: {},
                                    reserveState: ''
                                });
                            }}
                        />,
                    ]}
                    modal={false}
                    open={this.state.show}
                // onRequestClose={this.handleOpenDialog}
                >
                    {this.handleAlertText()}
                </Dialog>

            </div>
        )
        const reservePutConfrimView = (
            <div>
                <Dialog
                    style={styles.sweetAlert}
                    title='예약 변경 완료'
                    actions={[
                        <RaisedButton
                            primary={true}
                            // backgroundColor='#8CD4F5'
                            label="Ok"
                            onTouchTap={() => {
                                this.setState({
                                    putDataShow: false,
                                });

                            }}
                        />,
                    ]}
                    modal={false}
                    open={this.state.putDataShow}
                >
                    예약 데이터 변경 완료되었습니다.
                </Dialog>

            </div>
        )

        // const reserveStateConfirmView1 = (
        //     <div>
        //         <SweetAlert
        //             show={this.state.show}
        //             title="예약 상태 변경"
        //             text={this.handleAlertText()}
        //             showCancelButton
        //             onConfirm={() => {
        //                 this.props.onUpdateReserveState(this.state.reserve, this.state.reserveState)
        //                 this.setState({
        //                     show: false,
        //                     reserve: {},
        //                     reserveState: ''
        //                 });
        //             }}
        //             onCancel={() => {
        //                 this.setState({
        //                     show: false,
        //                     reserve: {},
        //                     reserveState: ''
        //                 });
        //             }}
        //             onClose={() => console.log('close')} // eslint-disable-line no-console
        //         />
        //     </div>
        // );
        // const reservePutConfrimView1 = (
        //     <div>
        //         <SweetAlert
        //             show={this.state.putDataShow}
        //             title='예약 변경 완료'
        //             text='예약 데이터 변경 완료되었습니다.'
        //             showCancelButton
        //             onConfirm={() => {
        //                 this.setState({
        //                     putDataShow: false,
        //                 });

        //             }}
        //             onClose={() => console.log('close')} // eslint-disable-line no-console
        //         />
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