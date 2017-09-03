import React, { Component } from 'react';

import { Field, FieldArray, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { loadAlarm as loadData } from '../../actions/accountInform';

import RaisedButton from 'material-ui/RaisedButton';


// let data=[{firstName: 'john', lastName: 'Doe'},{firstName: 'john2', lastName: 'Doe2'}]

class PlantInformSettingAlarmView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alarmTalkList:[{sequence:'1' , sendPoint:'-1'}]
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            alarmTalkList:nextProps.alarmTalkList
        })
        
    }
    componentWillMount() {
        
        this.setState({
            alarmTalkList:this.props.alarmTalkList
        })
        
    }
    render() {
        const { handleSubmit,  load ,submitting } = this.props

        const renderField = ({ input, label, type, meta: { touched, error } }) =>(
            <div>
                <label>
                    {label}
                </label>
                <div>
                    <input {...input} type={type} placeholder={label} />
                    {touched &&
                        error &&
                        <span>
                            {error}
                        </span>}
                </div>
            </div>
        )
        const renderMembers = ({ fields, meta: { error, submitFailed } }) =>(
            <ul>
                <li>
                    <button type="button" onClick={() => fields.push({})}>
                        Add Member
                    </button>
                    {submitFailed &&
                        error &&
                        <span>
                            {error}
                        </span>}
                </li>
                {fields.map((member, index) =>
                    <li key={index}>
                        <button
                            type="button"
                            title="Remove Member"
                            onClick={() => fields.remove(index)}
                        >제거
                        </button>
                        <h4>
                            Member #{index + 1}
                        </h4>
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
                        />
                    </li>
                )}
            </ul>
        )   
        const addView = (
            <form onSubmit={handleSubmit}>
            <div>
                <RaisedButton onClick={() => load(this.state.alarmTalkList)}>세팅불러오기</RaisedButton>
            </div>
                
                <FieldArray name="members" component={renderMembers} />
                <div>
                    <button type="submit" disabled={submitting}>
                        Submit
                    </button>
                </div>
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
    enableReinitialize :true
})(PlantInformSettingAlarmView);

const mapStateToProps = (state) => {
    return {
        // initialValues: {members:[{sequence:'1' , sendPoint:'-1'}]}
        initialValues: {members:state.accountinform.alarmData}
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        load: (data) => { dispatch(loadData(data)) },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlantInformSettingAlarmView);