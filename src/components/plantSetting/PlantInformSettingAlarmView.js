import React, { Component } from 'react';

import { Card, CardActions, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import SweetAlert from 'sweetalert-react';
import Remove from 'material-ui/svg-icons/content/remove';



class PlantInformSettingAlarmView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            sequence: '',
            sendPoint:'',
            disabledCheck: false,
            showPopUp:false,
        }
        this.handleChangeAlarm = this.handleChangeAlarm.bind(this);
        this.handleChangeSendPoint = this.handleChangeSendPoint.bind(this);
        this.handleRemoveData = this.handleRemoveData.bind(this);
        this.handleValue = this.handleValue.bind(this);
    }
    handleValue(i){
        if(i===-1){
            return `예약하자마자`
        }else{
            return `대기 순위 ${i}번째 일때`
        }
    }
    handleRemoveData() {
       
        if(this.props.onRemoveData(parseInt(this.state.sequence, 10) - 1)){
           
            this.setState({
                value: parseInt(this.props.alarmTalkData.sendPoint, 10),
            })
           
        }

    }
    handleChangeSendPoint(event, index, value) {
        
        if (this.props.onChangeAlarmData(this.props.alarmTalkData, value)) {

            this.setState({
                value: parseInt(this.props.alarmTalkData.sendPoint, 10),
            })
        }else{
            
            this.setState({ showPopUp: true });
        }
    }
    handleChangeAlarm() {

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            sequence: nextProps.alarmTalkData.sequence,
            sendPoint: nextProps.alarmTalkData.sendPoint,
            value: parseInt(nextProps.alarmTalkData.sendPoint, 10),
            disabledCheck: nextProps.alarmTalkData.sequence === "1" ? true : false
        })
        
     
    }
    componentWillMount() {

        this.setState({
            sequence: this.props.alarmTalkData.sequence,
            sendPoint: this.props.alarmTalkData.sendPoint,
            value: parseInt(this.props.alarmTalkData.sendPoint, 10),
            disabledCheck: this.props.alarmTalkData.sequence === "1" ? true : false
        })

    }
    render() {
        const changeFailedView = (
            <div>
                <SweetAlert
                    show={this.state.showPopUp}
                    title="알림톡세팅 변경 실패"
                    text="중복값은 사용 할 수 없습니다!"
                    onConfirm={() => {
                        this.setState({ showPopUp: false });
                        //this.props.onGetAlarmData();
                    }}
                />
            </div>
        );
        const items = [];
        for (let i = -1; i < 10; i++) {
            if(i!==0){
                items.push(<MenuItem value={i} key={i} primaryText={this.handleValue(i)} disabled={i===-1?true:false} />);
            }
        }


        const settingView = (
            <Card>
                <RaisedButton
                    type="button"
                    title="Remove Member"
                    onClick={this.handleRemoveData}
                    disabled={this.props.alarmTalkData.sequence === "1" ? true : false}
                    backgroundColor={'#FF3D00'} icon={<Remove color="white" />}
                >제거
                </RaisedButton>
                <CardHeader
                    title={+this.props.alarmTalkData.sequence + ' 번째 알림톡'}
                    // subtitle="현재상태"
                    actAsExpander={true}
                    // titleStyle={plantSettingStyles.cardHeader}
                    showExpandableButton={false}
                />
                <CardActions>
                    <DropDownMenu maxHeight={200} disabled={this.state.disabledCheck} value={this.state.value} onChange={this.handleChangeSendPoint}>
                        {items}
                    </DropDownMenu>
                </CardActions>

            </Card>

        );
        
        return (
            <div>
                {changeFailedView}
                {settingView}
            </div>
        );
    }
}

export default PlantInformSettingAlarmView;


// <Field
// name={`${member}.sendPoint`}
// type="text"
// component={renderCheckbox}
// value={member.sendPoint}
// />