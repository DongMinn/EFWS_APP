import React, { Component } from 'react';

import { Card, CardActions, CardHeader } from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SweetAlert from 'sweetalert-react';

import { plantSettingStyles } from '../../common/styles';
import '../../css/plantSetting.scss'


class PlantInformSettingNoShowView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 10,
            failStatus: false,
            successStatus: false
        }
        this.handleChangeTableTime = this.handleChangeTableTime.bind(this);
        this.handleUpdateNoshowTime = this.handleUpdateNoshowTime.bind(this);
    }
    handleUpdateNoshowTime() {
        if (this.props.onUpdateNoshowTime()) {
            this.setState({ successStatus: true })
        }else{
            this.setState({ failStatus: true })
        }
    }
    handleChangeTableTime(event, index, value) {
        if (this.props.onChangeNoshowTime(value)) {
            this.setState({ value: parseInt(this.props.noshowTime, 10) })
        }
    }
    componentWillReceiveProps(nextProps) {

        this.setState({
            value: parseInt(nextProps.noshowTime, 10)
        })
    }

    componentWillMount() {

        this.setState({
            value: parseInt(this.props.noshowTime, 10)
        })
    }
    render() {
        const items = [];
        for (let i = 1; i <= 60; i++) {
            items.push(<MenuItem value={i} key={i} primaryText={`${i} 분`} />);
        }
        const changeSuccessedView = (
            <div>
                <SweetAlert
                    show={this.state.successStatus}
                    title="매장세팅 변경 완료!"
                    // text=""
                    onConfirm={() => {
                        this.setState({ successStatus: false });
                    }}
                />
            </div>
        );
        const changeFailedView = (
            <div>
                <SweetAlert
                    show={this.state.failStatus}
                    title="매장세팅 변경 실패!"
                    text={this.props.returnMessage}
                    onConfirm={() => {

                        this.setState({ failStatus: false });
                        this.props.onGetPlantSetting();
                    }}
                />
            </div>
        );
        const saveButton = (
            <RaisedButton primary={true} onClick={this.handleUpdateNoshowTime}>저장</RaisedButton>
        )
        const settingView = (
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
        return (
            <div>
                {changeSuccessedView}
                {changeFailedView}
                <br />
                {saveButton}
                <br />
                {settingView}
            </div>
        );
    }
}

PlantInformSettingNoShowView.propTypes = {

};

export default PlantInformSettingNoShowView;