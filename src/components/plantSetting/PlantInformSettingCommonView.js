import React, { Component } from 'react';

import { Card, CardActions, CardHeader } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


import { plantSettingStyles } from '../../common/styles';
import '../../css/plantSetting.scss'


class PlantInformSettingTimeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxTimeShow: false,
            value: 10,
            maxTimeValue: 60,
            failStatus: false,
            successStatus: false,
            didChecked: false
        }
        this.handleChangeTableTime = this.handleChangeTableTime.bind(this);
        this.handleChangeTableMaxTime = this.handleChangeTableMaxTime.bind(this);
        this.handleChangeDidCheckBox = this.handleChangeDidCheckBox.bind(this);
    }
    handleChangeDidCheckBox() {

        if (this.props.onChangeDidCheck()) {

            this.setState({
                didChecked: this.props.didCheck === 'Y' ? true : false,
            })

        }
    }

    handleChangeTableTime(event, index, value) {
        if (this.props.onChangeNoshowTime(value)) {
            this.setState({ value: parseInt(this.props.noshowTime, 10) })
        }
    }
    handleChangeTableMaxTime(event, index, value) {
        if (this.props.onChangeMaxTime(value)) {
            this.setState({ maxTimeValue: parseInt(this.props.maxTime, 10) })
        }
    }
    componentWillReceiveProps(nextProps) {

        this.setState({
            value: parseInt(nextProps.noshowTime, 10),
            maxTimeValue: parseInt(nextProps.maxTime, 10),
            didChecked:nextProps.didCheck === 'Y' ? true : false,
        })
    }

    componentWillMount() {
        this.setState({
            value: parseInt(this.props.noshowTime, 10),
            maxTimeValue: parseInt(this.props.maxTime, 10),
            didChecked:this.props.didCheck === 'Y' ? true : false,
        })
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.noshowTime !== nextProps.noshowTime) return true;
        if (this.props.maxTime !== nextProps.maxTime) return true;
        if (this.props.didCheck !== nextProps.didCheck) return true;


        return false;

    }

    render() {
        const items = [];
        for (let i = 1; i <= 60; i++) {
            items.push(<MenuItem value={i} key={i} primaryText={`${i} 분`} />);
        }
        const maxtime_items = [];
        for (let i = 10; i <= 120; i++) {
            maxtime_items.push(<MenuItem value={i} key={i} primaryText={`${i} 분`} />);
        }

        const settingNoshowView = (
            <Card>
                <CardHeader
                    title={'No Show 시간 설정'}
                    subtitle="몇 분 후 NoShow 되는지 설정"
                    actAsExpander={true}
                    titleStyle={plantSettingStyles.cardHeader}
                    showExpandableButton={false}
                />
                <CardActions>

                    <DropDownMenu maxHeight={200} value={this.state.value} onChange={this.handleChangeTableTime}>
                        {items}
                    </DropDownMenu>

                </CardActions>

            </Card>
        )
        const settingMaxTimeView = (
            <Card>
                <CardHeader
                    title={'Max Time 설정'}
                    subtitle="고객에게 보이는 최대 시간 설정 (admin 페이지는 실제 값 노출)"
                    actAsExpander={true}
                    titleStyle={plantSettingStyles.cardHeader}
                    showExpandableButton={false}
                />
                <CardActions>

                    <DropDownMenu maxHeight={200} value={this.state.maxTimeValue} onChange={this.handleChangeTableMaxTime}>
                        {maxtime_items}
                    </DropDownMenu>

                </CardActions>

            </Card>

        )
        const settingDidView = (
            <Card>
                <CardHeader
                    title={'블루투스프린터 사용 설정'}
                    subtitle="블루투스프린터 사용 설정"
                    actAsExpander={true}
                    titleStyle={plantSettingStyles.cardHeader}
                    showExpandableButton={false}
                />
                <CardActions>

                    <Checkbox
                        label="사용여부"
                        checked={this.state.didChecked}
                        onCheck={this.handleChangeDidCheckBox}
                    />

                </CardActions>

            </Card>

        )
        return (
            <div>
                <br />
                {settingNoshowView}
                <br />
                {settingMaxTimeView}
                <br />
                {settingDidView}
            </div>
        );
    }
}

PlantInformSettingTimeView.propTypes = {

};

export default PlantInformSettingTimeView;