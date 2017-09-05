import React, { Component } from 'react';

import { Card, CardActions, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';


// let data=[{firstName: 'john', lastName: 'Doe'},{firstName: 'john2', lastName: 'Doe2'}]

class PlantInformSettingAlarmView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alarmTalkList: [{ sequence: '1', sendPoint: '-1' }],
            value: 1,
            sequence: '',
            sendPoint:'',
            disabledCheck: false
        }
        this.handleChangeAlarm = this.handleChangeAlarm.bind(this);
        this.handleChangeSendPoint = this.handleChangeSendPoint.bind(this);
        this.handleRemoveData = this.handleRemoveData.bind(this);
    }
    handleRemoveData() {
       
        if(this.props.onRemoveData(parseInt(this.state.sequence, 10) - 1)){
           
            this.setState({
                value: parseInt(this.props.alarmTalkData.sendPoint, 10),
            })
           
        }

    }
    handleChangeSendPoint(event, index, value) {
        // if (this.props.onChangeAlarmTime(this.props.plantSettingData, value)) {

        //     this.setState({
        //         value: parseInt(this.props.plantSettingData.tableWaitTime, 10)
        //     })
        // }
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
        const items = [];
        for (let i = -1; i < 10; i++) {
            items.push(<MenuItem value={i} key={i} primaryText={`입장 ${i} 번째 전`} disabled={i===-1?true:false} />);
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

        )
       
        return (
            <div>
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