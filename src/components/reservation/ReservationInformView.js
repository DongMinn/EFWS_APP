import React, { Component } from 'react';

import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { styles } from '../../common/styles';

class ReservationInformView extends Component {

    render() {
        const totalDataLeftView = (

            <Card style={styles.reserveinfoCard}>
                <CardHeader
                    title={'총 대기 상태'}
                    actAsExpander={true}
                    titleStyle={styles.cardHeader}
                    titleColor={'#FF5722'}
                />
                <CardActions>

                    <FlatButton label={'총 대기시간 '} labelStyle={styles.reserveinfoCardButton} disabled={true}></FlatButton>
                    <FlatButton label={this.props.reserveTotalTime + ' 분'} labelStyle={styles.reserveinfoCardButton} disabled={true}></FlatButton>
                    <br />
                    <FlatButton label={'총 대기 팀 '} labelStyle={styles.reserveinfoCardButton} disabled={true}></FlatButton>
                    <FlatButton label={this.props.reserveTotalTeam + ' 팀'} labelStyle={styles.reserveinfoCardButton} disabled={true}></FlatButton>

                </CardActions>
            </Card>
        )
        const totalDataCenterView = (
            <div>
                <Card style={styles.reserveinfoCard}>
                    <CardHeader
                        title={'전체 예약 상황'}
                        actAsExpander={true}
                        titleStyle={styles.cardHeader}
                        titleColor={'#FF5722'}
                    />
                    <CardActions>
                        {this.props.reserveTotalData.map((reserve, i) => (
                            <div key={i}>
                                <FlatButton label={reserve.tableType + '인 테이블 대기 팀: ' + reserve.remainingWaitingTeamCount + ' 팀'} style={styles.reserveState} disabled={true}></FlatButton>
                                <FlatButton label={'총 대기 시간: ' + reserve.remainingWaitingTime} style={styles.reserveState} disabled={true}></FlatButton>
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
                <div className="reserveTotalLeft">
                    {totalDataLeftView}
                </div>
                <div className="reserveTotalCenter">
                    {totalDataCenterView}
                </div>


            </div>
        );
    }
}

export default ReservationInformView;


