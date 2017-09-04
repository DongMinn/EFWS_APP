import React, { Component } from 'react';

import { Field, FieldArray, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { loadAlarm as loadData } from '../../actions/accountInform';

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
            value: 1
        }
        this.handleChangeAlarm = this.handleChangeAlarm.bind(this);
        this.handleTest = this.handleTest.bind(this);
    }
    handleTest (input) {
        console.log(input);
        debugger;
    }
    handleChangeAlarm() {

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            alarmTalkList: nextProps.alarmTalkList
        })
        this.props.load(this.state.alarmTalkList);
    }
    componentWillMount() {

        this.setState({
            alarmTalkList: this.props.alarmTalkList
        })
    }
    render() {
        const items = [];
        for (let i = -1; i < 80; i++) {
            items.push(<MenuItem value={i} key={i} primaryText={`입장 ${i} 번째 전`} />);
        }
        const { handleSubmit, load, submitting } = this.props

        const renderField = ({ input, label, type, meta: { touched, error } }) => (
            <div>
            {this.handleTest(input)}
                <label>
                    {label}
                </label>
                <div>
                    <input {...input} type={type} placeholder={label} />
                </div>
            </div>
        )
        const renderCheckbox = ({ input, value }) => (
            <div>
            {this.handleTest(input)}
            <DropDownMenu maxHeight={200} {...input} disabled={this.state.disabledCheck} value={parseInt(input, 10)} onChange={this.handleChangeTableTime}>
                >{items}
            </DropDownMenu>
            </div>
        )
        const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
            <div>
                <div>
                    <RaisedButton
                        onClick={() => fields.push({})}
                        backgroundColor={'#FFEA00'} icon={<Add color="white" />}
                    >
                    추가</RaisedButton>
                </div>
                {fields.map((member, index) =>
                    <p key={index}>
                        <Card>
                            <RaisedButton
                                type="button"
                                title="Remove Member"
                                onClick={() => fields.remove(index)}
                                disabled={index === 0 ? true : false}
                                backgroundColor={'#FF3D00'} icon={<Remove color="white" />}
                            >제거
                            </RaisedButton>
                            <h3>
                                {index + 1}번째 알림
                            </h3>
                            <Field
                                name={`${member}.sequence`}
                                type="text"
                                component={renderField}
                                label="sequence"

                            />
                            <Field
                                name={`${member}.sendPoint`}
                                type="text"
                                component={renderField}
                                label="sendPoint"
                                value={"dfdf"}
                            />
                           
                        </Card>
                    </p>
                )}
            </div>
        )
        const addView = (
            <form onSubmit={handleSubmit(this.handleChangeAlarm)}>
                <br />
                <div>
                    <RaisedButton primary={true} type="submit" disabled={submitting}>저장</RaisedButton>
                    <br/>
                </div>
                <br/>
                <FieldArray name="members" component={renderMembers} />

            </form>
        )
        return (
            <div>
                {addView}
            </div>
        );
    }
}
PlantInformSettingAlarmView = reduxForm({
    form: 'AlarmTalkSetting', // a unique identifier for this form
    enableReinitialize: true
})(PlantInformSettingAlarmView);

const mapStateToProps = (state) => {
    return {
        // initialValues: {members:[{sequence:'1' , sendPoint:'-1'}]}
        initialValues: { members: state.accountinform.alarmData }
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        load: (data) => { dispatch(loadData(data)) },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlantInformSettingAlarmView);


// <Field
// name={`${member}.sendPoint`}
// type="text"
// component={renderCheckbox}
// value={member.sendPoint}
// />