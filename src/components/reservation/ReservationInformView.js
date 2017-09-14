import React, { Component } from 'react';

import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Autonew from 'material-ui/svg-icons/action/autorenew';
import IconButton from 'material-ui/IconButton';

import { reservationInfoStyle, styles, iconStyle } from '../../common/styles';

class ReservationInformView extends Component {
    constructor(props){
        super(props);

        this.handleSubTitle = this.handleSubTitle.bind(this);
    }
    handleSubTitle(){
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        return yyyy+'년 '+mm+'월 '+dd+'일'
    }

    render() {

        const totalDataLeftView = (
            <div>
                <Card style={reservationInfoStyle.reserveinfoCard}>
                    <CardHeader
                        title={'종합 정보'}
                        actAsExpander={true}
                        titleStyle={styles.infoCardHeader}
                        titleColor={'#FF5722'}
                        subtitle={this.handleSubTitle()}
                        subtitleStyle={styles.infoCardHeaderSub}
                    />
                    <CardActions>

                        <FlatButton label={'총 대기시간 '} labelStyle={styles.reserveinfoCardButton} disabled={true}></FlatButton>
                        <FlatButton label={this.props.reserveTotalTime + ' 분'} labelStyle={styles.reserveinfoCardButton} disabled={true}></FlatButton>
                        <br />
                        <FlatButton label={'총 대기 팀 '} labelStyle={styles.reserveinfoCardButton} disabled={true}></FlatButton>
                        <FlatButton label={this.props.reserveTotalTeam + ' 팀'} labelStyle={styles.reserveinfoCardButton} disabled={true}></FlatButton>
                        <br/>
                        <br/>
                        <br/>
                        <FlatButton label={'정보수신 시간:'+ new Date()}  disabled={true}></FlatButton>
                    </CardActions>
                </Card>
            </div>
        )
        const totalDataCenterView = (
            <div>
                <Card style={reservationInfoStyle.reserveinfoCard}>
                    <CardHeader
                        title={'상세 정보'}
                        actAsExpander={true}
                        titleStyle={styles.infoCardHeader}
                        titleColor={'#FF5722'}
                    />
                    <CardActions>
                        {this.props.reserveTotalData.map((reserve, i) => (
                            <div key={i}>
                                <FlatButton label={reserve.tableType + '인 테이블 대기 팀: ' + reserve.remainingWaitingTeamCount + ' 팀'} style={styles.reserveState} disabled={true}></FlatButton>
                                <FlatButton label={'총 대기 시간: ' + reserve.remainingWaitingTime+'분'} style={styles.reserveState} disabled={true}></FlatButton>
                                <br />
                            </div>
                        ))
                        }
                    </CardActions>
                </Card>
            </div>
        )
        return (
            <div>
          
                <div className="reserve-total-left">
                    {totalDataLeftView}
                </div>
                <div className="reserve-total-center">
                    {totalDataCenterView}
                </div>


            </div>
        );
    }
}

export default ReservationInformView;


