import React, { Component } from 'react';
import PropTypes from 'prop-types';


import RaisedButton from 'material-ui/RaisedButton';
import Add from 'material-ui/svg-icons/content/add';


class PlantInformAlarmAddButtonView extends Component {
    constructor(props){
        super(props);
        this.state={

        }
        this.handleAddData = this.handleAddData.bind(this);
    }
    handleAddData(){
        this.props.onAddData();
    }
    render() {
        return (
            <div>
                <RaisedButton icon={<Add color="white"/>}primary={true} onClick={this.handleAddData}>추가</RaisedButton>
            </div>
        );
    }
}

PlantInformAlarmAddButtonView.propTypes = {

};

export default PlantInformAlarmAddButtonView;