import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import IconButton from 'material-ui/IconButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
// import SweetAlert from 'sweetalert-react';
import '../../css/reserve.scss';
import { styles, labelStyles, dialogStyle, NoshowListStyle } from '../../common/styles';




class ReservationStateTestView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            dialogOpen: false,
            reserve: {},
            reserveState: '',
            putDataShow: false,
            labelColor: '',
            historyOpen: false,
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
        this.handleGuideTime = this.handleGuideTime.bind(this);
        this.handleChangeTimeLabel = this.handleChangeTimeLabel.bind(this);
        this.handleGetHistoryList = this.handleGetHistoryList.bind(this);
        this.handleChangeHistoryState = this.handleChangeHistoryState.bind(this);
        this.gap_time = '';

    }
    handleChangeHistoryState(state) {

       if(state==='State:RESERVATION') {return '상태: 예약'}
       else if(state==='AlarmTalk:RESERVATION'){return '톡 발송: 접수'}
       else if(state==='State:CALL'){return '상태: 자동알림'}
       else if(state==='AlarmTalk:AutoCALL'){return '톡 발송: 자동알림'}
       else if(state==='State:NOSHOW'){return '상태: NOSHOW'}
       else if(state==='State:WAIT'){return '상태: 입장대기'}
       else if(state==='AlarmTalk:CALL'){return '톡 발송: 입장알림'}
       else if(state==='DID:CALL'){return 'DID: 입장알림'}
       else return state
    }
    handleGetHistoryList(reservationNo) {

        this.props.onGetHistoryList(reservationNo).then(
            response => {
                console.log(this.props.historyList)
                if (response) {
                    this.setState({ historyOpen: true })
                }
            }
        )

    }
    handleChangeTimeLabel() {
        if (this.props.reserveData.guidedWaitingTime === '-1')
            return labelStyles.reservationInfoButton
        else if (this.props.reserveData.guidedWaitingTime < this.gap_time) {
            return labelStyles.reservationInfoButtonRed
        }
    }
    handleGuideTime() {

        let g_time = this.props.reserveData.guidedWaitingTime;

        if (this.props.reserveData.guidedWaitingTime === '-1') {
            g_time = ''
        }
        return '가이드 시간: ' + g_time + ' 분'
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
        this.gap_time = gap_m;
        return gap_m + ' 분 경과';
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
        if (this.state.historyOpen !== nextState.historyOpen) return true;
        if (this.state.reserveState !== nextState.reserveState) return true;
        if (this.state.putDataShow !== nextState.putDataShow) return true;
        if (this.props.historyList !== nextProps.historyList) return true;

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

                            badgeContent={this.props.reserveData.alarmtalkCount}
                            primary={true}
                            badgeStyle={{ top: 12, right: 12 }}
                        >
                            <IconButton tooltip="알림톡발송개수">
                                <NotificationsIcon />
                            </IconButton>
                        </Badge>
                    </CardHeader>t

                    <CardActions>

                        <Card>
                            <FlatButton backgroundColor={this.handleColorChange(this.props.reserveData.waitingState)} label={this.handleLabel(this.props.reserveData.waitingState)} labelStyle={labelStyles.reservationInfoButton} style={styles.reserveState} disabled={true}></FlatButton>
                            <FlatButton backgroundColor={'##FAFAFA'} label={this.handleOrderTime()} style={styles.reserveState} labelStyle={labelStyles.reservationInfoButton} disabled={true}></FlatButton>
                            <FlatButton backgroundColor={'##FAFAFA'} label={this.handleGuideTime()} style={styles.reserveState} labelStyle={labelStyles.reservationInfoButton} disabled={true}></FlatButton>
                            <FlatButton backgroundColor={'##FAFAFA'} label={this.handleWaitingTime()} style={styles.reserveState} labelStyle={this.handleChangeTimeLabel()} disabled={true}></FlatButton>

                        </Card>
                    </CardActions>
                    <CardActions>
                        <RaisedButton backgroundColor={'#8C9EFF'} onClick={() => { this.handleConfirmState(this.props.reserveData, 'CALL') }}>CALL</RaisedButton>
                        <RaisedButton backgroundColor={'#B9F6CA'} onClick={() => { this.handleConfirmState(this.props.reserveData, 'ENTRANCE') }}>입장</RaisedButton>
                        <RaisedButton backgroundColor={'#FFD180'} onClick={() => { this.handleConfirmState(this.props.reserveData, 'NOSHOW') }}>NO-SHOW</RaisedButton>
                        <RaisedButton backgroundColor={'#FFFF8D'} onClick={() => { this.handleGetHistoryList(this.props.reserveData.reservationNo) }}>HISTORY</RaisedButton>
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
        const historyList =(
            <Table>
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                style={NoshowListStyle.headerBack}
            >
                <TableRow>
                    <TableHeaderColumn style={NoshowListStyle.headerStyle}>이벤트명</TableHeaderColumn>
                    <TableHeaderColumn style={NoshowListStyle.headerStyle}>이벤트발생시간</TableHeaderColumn>

                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
            >
                {
                    this.props.historyList.map((data, i) => (
                        <TableRow key={i}>
                            <TableRowColumn style={NoshowListStyle.rowStyle}>{this.handleChangeHistoryState(data.action)}</TableRowColumn>
                            <TableRowColumn style={NoshowListStyle.rowStyle}>{data.eventTime}</TableRowColumn>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        )
        const historyListView = (
            <div>
                <Dialog
                    autoScrollBodyContent={true}
                    style={styles.sweetAlert}
                    title="예약데이터 History"
                    titleStyle={dialogStyle.titleStyle}
                    actions={[

                        <FlatButton
                            primary={true}
                            // backgroundColor='#8CD4F5'
                            label="Ok"
                            onTouchTap={() => {

                                this.setState({
                                    historyOpen: false,

                                });
                            }}
                        />,
                    ]}
                    modal={false}
                    open={this.state.historyOpen}
                // onRequestClose={this.handleOpenDialog}
                >
                    {historyList}
                </Dialog>

            </div>
        )
        
      
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
                        {historyListView}
                    </div>
                </div>
            </div>
        );
    }
}

ReservationStateTestView.propTypes = {

};

export default ReservationStateTestView;