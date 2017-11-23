import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import SweetAlert from 'sweetalert-react';

class PlantSettingSaveButtonView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            successStatus: false,
            failStatus: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleUpdateSetting = this.handleUpdateSetting.bind(this);
    }
    handleUpdateSetting() {
        this.setState({
            show: false,
        });
        this.props.onUpdatePlantSetting().then(
            response => {
                
                if(response===true){
                    this.setState({ successStatus: true })
                }else{
                    this.setState({ failStatus: true })
                    
                }
            }
        )
    }
    handleClick() {
        this.setState({
            show: true
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.failStatus !== nextState.failStatus) return true;
        if (this.state.show !== nextState.show) return true;
        if (this.state.successStatus !== nextState.successStatus) return true;

        return false;

    }

    render() {
        const plantSettingConfirmView = (
            <div>
                <SweetAlert
                    show={this.state.show}
                    title="매장세팅 변경"
                    text={'매장세팅을 저장 하시겠습니까?'}
                    showCancelButton
                    onConfirm={this.handleUpdateSetting}
                    onCancel={() => {
                        this.setState({
                            show: false,
                        });
                    }}
                />
            </div>
        );
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
                    text={this.props.returnMessage===undefined?'사용중인 테이블입니다.':this.props.returnMessage}
                    onConfirm={() => {
                        this.setState({ failStatus: false });
                        this.props.onGetPlantSetting();
                    }}
                />
            </div>
        );
        return (
            <div>
                {plantSettingConfirmView}
                {changeSuccessedView}
                {changeFailedView}
                <RaisedButton primary={true} onClick={this.handleClick}>저장</RaisedButton>
            </div>
        );
    }
}


export default PlantSettingSaveButtonView;