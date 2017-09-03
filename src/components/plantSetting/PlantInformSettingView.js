import React, { Component } from 'react';


import Checkbox from 'material-ui/Checkbox';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { plantSettingStyles } from '../../common/styles';
import '../../css/plantSetting.scss'

class PlantInformSettingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableChecked: true,
            timeChecked: false,
            value: 10,
            disabledCheck: false,
        }
        this.handleChangeTableCheckBox = this.handleChangeTableCheckBox.bind(this);
        this.handleChangeTimeCheckBox = this.handleChangeTimeCheckBox.bind(this);
        this.handleChangeTableTime = this.handleChangeTableTime.bind(this);
    }
    handleChangeTableTime(event, index, value) {

        if (this.props.onChangeTableTime(this.props.plantSettingData, value)) {

            this.setState({
                value: parseInt(this.props.plantSettingData.tableWaitTime, 10)
            })
        }
    }
    handleChangeTableCheckBox() {

        if (this.props.onChangeTableCheckFlag(this.props.plantSettingData , 'table')) {

            this.setState({
                tableChecked: this.props.plantSettingData.tableUseChk === 'Y' ? true : false,
                disabledCheck: this.props.plantSettingData.tableUseChk === 'Y' ? false : true
            })

        }
    }
    handleChangeTimeCheckBox() {
        
                if (this.props.onChangeTableCheckFlag(this.props.plantSettingData , 'time')) {
                    this.setState({
                        timeChecked: this.props.plantSettingData.tableWaitTimeUseChk === 'Y' ? true : false,
                    })
        
                }
            }
    componentWillReceiveProps(nextProps) {
        this.setState({
            tableChecked: nextProps.plantSettingData.tableUseChk === 'Y' ? true : false,
            timeChecked: nextProps.plantSettingData.tableWaitTimeUseChk === 'Y' ? true : false,
            disabledCheck: nextProps.plantSettingData.tableUseChk === 'Y' ? false : true,
            value: parseInt(nextProps.plantSettingData.tableWaitTime, 10)
        })
    }

    componentWillMount() {

        this.setState({
            tableChecked: this.props.plantSettingData.tableUseChk === 'Y' ? true : false,
            timeChecked: this.props.plantSettingData.tableWaitTimeUseChk === 'Y' ? true : false,
            disabledCheck: this.props.plantSettingData.tableUseChk === 'Y' ? false : true,
            value: parseInt(this.props.plantSettingData.tableWaitTime, 10)
        })
    }
    render() {
        const items = [];
        for (let i = 1; i < 80; i++) {
            items.push(<MenuItem value={i} key={i} primaryText={`${i} 분`} />);
        }
        const settingView = (
            <Card>
                <CardHeader
                    title={+this.props.plantSettingData.tableType + ' 인 테이블'}
                    // subtitle="현재상태"
                    actAsExpander={true}
                    titleStyle={plantSettingStyles.cardHeader}
                    showExpandableButton={false}
                />
                <CardActions>
                    <Checkbox
                        label="테이블 사용여부"
                        checked={this.state.tableChecked}
                        onCheck={this.handleChangeTableCheckBox}
                    />
                    <DropDownMenu maxHeight={200} disabled={this.state.disabledCheck} value={this.state.value} onChange={this.handleChangeTableTime}>
                        {items}
                    </DropDownMenu>
                    <Checkbox
                        label="시스템시간 사용여부"
                        checked={this.state.timeChecked}
                        onCheck={this.handleChangeTimeCheckBox}
                        disabled={this.state.disabledCheck}
                    />
                </CardActions>

            </Card>

        )
        return (
            <div>
                <div id="plantSetting">
                    {settingView}
                </div>

            </div>
        );
    }
}

export default PlantInformSettingView;


