import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Settings from 'material-ui/svg-icons/action/settings';
import Autonew from 'material-ui/svg-icons/action/autorenew';
import Delete from 'material-ui/svg-icons/action/delete';

import SweetAlert from 'sweetalert-react';
import pizzaImg from '../images/pizza.jpg';

import { styles, customerStyles } from '../common/styles';
import '../css/customerReserve.scss';

const gridStyles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        height: 410,
        overflowY: 'auto',
    },
    subtitleStyle: {
        color: "white",
        fontSize: 30,
        textAlign: "right",
        margin: "0px 10px",
        fontWeight: "bold"
    },
    featuredTitleStyle: {
        color: "white",
        fontSize: 12
    },
    featuredSubtitleStyle: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold"
    }
};

class CustomerReservationStateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginId: '',
            customerCellPhone: '',
            dialogOpen: false,
            customerData: {},
            showPopUp: false
        }
        this.setCustomerData = this.setCustomerData.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
        this.handleChangeReserve = this.handleChangeReserve.bind(this);
    }
    setCustomerData(customerData, state) {
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

    onRefreshClick() {
        console.log('onRefreshClick');
    }

    render() {
        const now = new Date();
        const tilesData = [
            {
                img: pizzaImg,
                title: now.toLocaleString() + ' 기준',
                titleBackground: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)",
                subtitle: this.props.customerData.remainingWaitingTime+'분 후 입장가능합니다!',
                icon: <IconButton><Autonew color="white" onClick={this.onRefreshClick.bind(this)}/></IconButton>,
                featured: true,
                cols: 2,
                rows: 30
            },
            {
                title: '대기번호',
                subtitle: this.props.customerData.waitingNo,
                cols: 1,
                rows: 6
            },
            {
                title: '현재 대기팀 수',
                // icon: <IconButton><StarBorder color="black" /></IconButton>,
                subtitle: this.props.customerData.tableType, //TODO: 대기팀데이터
                cols: 1,
                rows: 6
            },
            {
                title: this.props.customerData.tableType+'인석',
                icon:  <IconButton><Settings color="white" /></IconButton>,
                titleBackground: "green",
                cols: 1,
                rows: 5
            },
            {
                title: '예약삭제',
                icon: <IconButton><Delete color="white" /></IconButton>,
                titleBackground: "red",
                cols: 1,
                rows: 5
            }];

        const reservateView = (
            <div>
                {this.props.availableCheck ?
                    <div style={gridStyles.root}>
                        <GridList
                            cols={2}
                            cellHeight={10}
                            padding={1}
                            style={gridStyles.gridList}
                        >
                            {tilesData.map((tile) => (
                                <GridTile
                                    key={tile.img}
                                    title={tile.title}
                                    titleStyle={tile.featured ? gridStyles.featuredTitleStyle : ''}
                                    actionIcon={tile.icon}
                                    actionPosition="right"
                                    titlePosition="top"
                                    titleBackground={tile.titleBackground}
                                    cols={tile.cols}
                                    rows={tile.rows}
                                    subtitle={tile.subtitle}
                                    subtitleStyle={tile.featured ? gridStyles.featuredSubtitleStyle : gridStyles.subtitleStyle}
                                >
                                    <img src={tile.img}/>
                                </GridTile>
                            ))}
                        </GridList>
                        <div>
                            피자몰 명동점에 방문해주셔서 감사합니다.
                        </div>
                        <Card>
                            <CardHeader
                                title={'고객대기상태'}
                                // subtitle="현재상태"
                                actAsExpander={true}
                                showExpandableButton={true}
                            />
                            <div>
                                <CardActions>
                                    <FlatButton label={'대기 번호:'} style={styles.reserveState} disabled={true}></FlatButton>
                                    <FlatButton label={this.props.customerData.waitingNo + ''} style={styles.reserveState} disabled={true}></FlatButton>
                                </CardActions>
                            </div>
                            <CardActions>
                                <FlatButton label={'예약 타입:'} style={styles.reserveState} disabled={true}></FlatButton>
                                <FlatButton label={this.props.customerData.tableType + ''} style={styles.reserveState} disabled={true}></FlatButton>
                            </CardActions>
                            <CardActions>
                                <FlatButton label={'대기 시간:'} style={styles.reserveState} disabled={true}></FlatButton>
                                <FlatButton label={this.props.customerData.remainingWaitingTime + ''} style={styles.reserveState} disabled={true}></FlatButton>
                            </CardActions>
                            <CardText expandable={true}>
                                <RaisedButton style={styles.reserveButtonUpdate} onClick={() => { this.setCustomerData(this.props.customerData, 'MODI') }} >대기 예약 수정</RaisedButton>
                                <span>  </span>
                                <RaisedButton style={styles.reserveButtonDelete} onClick={() => { this.setCustomerData(this.props.customerData, 'CANCEL') }}>예약 삭제</RaisedButton>
                            </CardText>
                        </Card>
                    </div>
                    : '대기 데이터가 없습니다.'}
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