import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import { GridList, GridTile } from 'material-ui/GridList';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Settings from 'material-ui/svg-icons/action/settings';
import Autonew from 'material-ui/svg-icons/action/autorenew';
import Delete from 'material-ui/svg-icons/action/delete';



import SweetAlert from 'sweetalert-react';
import pm from '../../images/pm1.JPG';
import al from '../../images/ru1.jpg';
import ss from '../../images/ss1.JPG';
import ru from '../../images/ru1.jpg';
import ee from '../../images/ee1.JPG';


import { styles, customerStyles, gridStyles, iconStyle } from '../../common/styles';
import '../../css/customerReserve.scss';



const style1 = {
    img: {
      maxWidth:'100%',
      maxHeight: '100%'
    },
    ss:{
        height:'100%', 
        maxHeight:'200px'
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
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleImage = this.handleImage.bind(this);
    }
    handleImage(){
        
        if(this.props.loginId.toUpperCase().indexOf("AL")!==-1){
            return al
        }
        else if(this.props.loginId.toUpperCase().indexOf("PM")!==-1){
            return pm
        }
        else if(this.props.loginId.toUpperCase().indexOf("SS")!==-1){
            return ss
        }
        else if(this.props.loginId.toUpperCase().indexOf("RU")!==-1){
            return ru
        }
        else 
            return ee
    }
    handleTitle() {
        if (this.props.customerData.waitingState === "WAIT") return '지금 입장하세요!'
        else if (this.props.availableCheck === false) return '대기정보가 없습니다!'
        return '예상대기시간 '+(Number(this.props.customerData.remainingWaitingTime)>Number(this.props.maxTime)?this.props.maxTime:this.props.customerData.remainingWaitingTime) + '분'
    }
    setCustomerData(customerData, state) {
        if (state === 'MODI') {
            this.handleOpenDialog();
            this.setState({
                customerData: customerData
            })
        }
        else {
            if (this.props.customerData.tableType !== undefined) {
                this.setState({
                    showPopUp: true,
                })
            }
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

        if (this.state.dialogOpen === false && this.props.customerData.tableType !== undefined) {
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

    handleRefreshClick() {
        console.log('onRefreshClick');
        this.props.onGetReserveData(this.props.loginId, this.props.reservationNo)
    }

    render() {
        const customerTitleView = (
            <AppBar
                // title={<span onTouchTap={this.handleLinkToHome}>Home</span>}
                title={<span style={styles.title}>대기정보</span>}
                showMenuIconButton={false}
                style={{ backgroundColor: '#f37321' }}
            // iconElementRight={logoutButton}
            />
        )
     
        const now = new Date();
        const tilesData = [
            {
                img: this.handleImage(),
                title: now.toLocaleString() + ' 기준',
                titleBackground: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.5) 70%,rgba(0,0,0,3) 100%)",
                subtitle: this.handleTitle(),
                icon: <IconButton iconStyle={iconStyle.settingIcon} style={iconStyle.sizeLarge}><Autonew color="white" onClick={this.handleRefreshClick} /></IconButton>,
                featured: true,
                cols: 2,
                rows: 30
            },
            {
                title: '대기번호',
                subtitle: this.props.customerData.waitingNo,
                titleBackground: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.5) 70%,rgba(0,0,0,3) 100%)",
                cols: 1,
                rows: 6
            },
            {
                title: '현재 대기팀 수',
                // icon: <IconButton><StarBorder color="black" /></IconButton>,
                subtitle: this.props.customerData.remainingWaitingTeamCount, //TODO: 대기팀데이터
                titleBackground: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.5) 70%,rgba(0,0,0,3) 100%)",
                cols: 1,
                rows: 6
            },
            {
                //title: this.props.customerData.tableType === undefined ? '정보수정' : this.props.customerData.tableType + '인 테이블',
                title: this.props.customerData.tableType === undefined ? '정보수정' : '대기정보변경',
                icon: <IconButton iconStyle={iconStyle.settingIcon} style={iconStyle.sizeLarge}><Settings color="white" onClick={() => { this.setCustomerData(this.props.customerData, 'MODI') }} /></IconButton>,
                titleBackground: "#2b3f6b",
                cols: 1,
                rows: 5
            },
            {
                title: '대기삭제',
                icon: <IconButton iconStyle={iconStyle.settingIcon} style={iconStyle.sizeLarge}><Delete color="white" onClick={() => { this.setCustomerData(this.props.customerData, 'CANCEL') }} /></IconButton>,
                titleBackground: "red",
                cols: 1,
                rows: 5
            }];
        const customerGridView = (
            <div style={gridStyles.root}>
                <GridList
                    cols={2}
                    cellHeight={10}
                    padding={1}
                    style={gridStyles.gridList}
                >
                    {tilesData.map((tile, index) => (
                        <GridTile
                            key={index}
                            title={tile.title}
                            titleStyle={tile.featured ? gridStyles.featuredTitleStyle : undefined}
                            actionIcon={tile.icon}
                            actionPosition="right"
                            titlePosition="top"
                            titleBackground={tile.titleBackground}
                            cols={tile.cols}
                            rows={tile.rows}
                            subtitle={tile.subtitle}
                            subtitleStyle={tile.featured ? gridStyles.featuredSubtitleStyle : gridStyles.subtitleStyle}
                        >
                            
                            <img src={tile.img} style={style1.img} alt=""/>
                            
                        </GridTile>
                    ))}
                </GridList>
                

            </div>
        )


        const reservateView = (
            <div>
                {customerGridView}
            </div>
        )
        const items = [];
        for (let i = 0; i < this.props.plantSettingList.length; i++) {
            
            if(this.props.plantSettingList[i].tableUseChk==='Y'){
                items.push(<MenuItem value={this.props.plantSettingList[i].tableType} key={i} primaryText={`${this.props.plantSettingList[i].tableType} 인석`} />);
            }
        }
        const DialogView = (
            <div>
                <Dialog
                    style={styles.sweetAlert}
                    title='고객 대기예약 수정'
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
                            onTouchTap={() => {
                                this.handleChangeData()
                               
                                }
                            }
                        />,
                    ]}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleOpenDialog}
                >
                    <h4 id="dialogText">수정시 대기순번은 </h4>
                    <h4 id="dialogText">마지막으로 변경 됩니다.</h4>
                    <h3>대기예약 구분</h3><br/>
                    <DropDownMenu value={this.state.customerData.tableType} onChange={this.handleChangeReserve}>
                        {items}
                    </DropDownMenu>
                </Dialog>

            </div>
        )
        const reserveStateConfirmView = (
            <div>
                <SweetAlert
                    show={this.state.showPopUp}
                    title="대기예약 삭제"
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
                    title='대기예약 변경 완료'
                    text='대기예약 변경 완료되었습니다.'
                    onConfirm={() => {
                        this.setState({
                            putDataShow: false,
                        });
                        window.location.reload();
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

