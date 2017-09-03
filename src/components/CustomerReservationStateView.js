import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SweetAlert from 'sweetalert-react';

import { styles, customerStyles } from '../common/styles';
import '../css/customerReserve.scss';

class CustomerReservationStateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginId: '',
            customerCellPhone: '',
            dialogOpen: false,
            customerData: {},
            showPopUp:false
        }
        this.setCustomerData = this.setCustomerData.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
        this.handleChangeReserve = this.handleChangeReserve.bind(this);
    }
    setCustomerData(customerData , state) {
        if (state === 'MODI') {
            this.handleOpenDialog();
            this.setState({
                customerData: customerData
            })
        }
        else {
            this.setState({
                showPopUp: true,
            })
        }

    }
    handleChangeReserve(event, index, value) {

        let tmpState = this.state.customerData;
        let newState = {
            ...tmpState,
            tableType: value
        }
        this.setState({ customerData: newState });

    }
    handleChangeData() {

        this.handleOpenDialog();
        this.props.onUpdateCustomerReservation(this.state.customerData, 'CANCEL').then(
            response => {
                if (response) {
                    response ? this.setState({ putDataShow: true }) : this.setState({ putDataShow: false })
                }
            })
    }
    handleOpenDialog() {

        if (this.state.dialogOpen === false) {
            this.setState({ dialogOpen: true })
        }
        else {
            this.setState({ dialogOpen: false })
        }
    }
    // componentWillMount() {
    //     this.setState({
    //         customerData: this.props.customerData
    //     })
    // }
    componentWillReceiveProps(nextProps) {
        
        this.setState({
            customerData: nextProps.customerData
        })
    }


    render() {
        const reservateView = (
            <div>
            {this.props.availableCheck?
                <Card>
                    <CardHeader
                        title={'고객대기상태'}
                        // subtitle="현재상태"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardActions>
                        <FlatButton label={'대기 번호:'} style={styles.reserveState} disabled={true}></FlatButton>
                        <FlatButton label={this.props.customerData.waitingNo + ''} style={styles.reserveState} disabled={true}></FlatButton>
                    </CardActions>
                    <CardActions>
                        <FlatButton label={'예약 타입:'} style={styles.reserveState} disabled={true}></FlatButton>
                        <FlatButton label={this.props.customerData.tableType + ''} style={styles.reserveState} disabled={true}></FlatButton>
                    </CardActions>
                    <CardActions>
                        <FlatButton label={'대기 시간:'} style={styles.reserveState} disabled={true}></FlatButton>
                        <FlatButton label={this.props.customerData.remainingWaitingTime + ''} style={styles.reserveState} disabled={true}></FlatButton>
                    </CardActions>
                    <CardText expandable={true}>
                        <RaisedButton style={styles.reserveButtonUpdate} onClick={() => { this.setCustomerData(this.props.customerData , 'MODI') }} >대기 예약 수정</RaisedButton>
                        <span>  </span>
                        <RaisedButton style={styles.reserveButtonDelete} onClick={() => { this.setCustomerData(this.props.customerData , 'CANCEL') }}>예약 삭제</RaisedButton>
                    </CardText>
                </Card>
                :'대기 데이터가 없습니다.'}
            </div>
        )
        const customerTitleView = (
            <AppBar
                // title={<span onTouchTap={this.handleLinkToHome}>Home</span>}
                title={<span style={styles.title}>예약정보</span>}
                showMenuIconButton={false}
            // iconElementRight={logoutButton}
            />
        )
        const DialogView = (
            <div>
                <Dialog
                    style={styles.sweetAlert}
                    title='고객 대기 상태 수정'
                    titleStyle={customerStyles.dialogTitle}
                    actions={[
                        <RaisedButton
                            backgroundColor='#C1C1C1'
                            label="Cancel"
                            onTouchTap={this.handleOpenDialog}
                        />,
                        <RaisedButton
                            backgroundColor='#8CD4F5'
                            label="Ok"
                            onTouchTap={this.handleChangeData}
                        />,
                    ]}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleOpenDialog}
                >
                    <h3 id="dialogText">수정시 기존 대기상태는 삭제처리 됩니다.</h3>
                    <br />
                    테이블 타입 :
                    <DropDownMenu value={this.state.customerData.tableType} onChange={this.handleChangeReserve}>
                        <MenuItem value={'2'} primaryText="2인테이블" />
                        <MenuItem value={'4'} primaryText="4인테이블" />
                        <MenuItem value={'6'} primaryText="6인테이블" />
                        <MenuItem value={'8'} primaryText="8인테이블" />
                        <MenuItem value={'9'} primaryText="9인테이블" />
                    </DropDownMenu>
                </Dialog>

            </div>
        )
        const reserveStateConfirmView = (
            <div>
                <SweetAlert
                    show={this.state.showPopUp}
                    title="대기 상태 삭제"
                    text={'대기 삭제 하시겠습니까?'}
                    showCancelButton
                    onConfirm={() => {
                        this.props.onDeleteReserveData(this.state.customerData, 'CANCEL')
                        this.setState({
                            showPopUp: false
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            showPopUp: false,         
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
                    title='대기 변경 완료'
                    text='대기 변경 완료되었습니다.'
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
        return (
            <div>
                {reserveStateConfirmView}
                {reservePutConfrimView}
                {DialogView}
                {customerTitleView}
                {reservateView}
            </div>
        );
    }
}

export default CustomerReservationStateView;