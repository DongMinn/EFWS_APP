import authentication from './authentication';
import {reducer as formReducer} from 'redux-form';
import {combineReducers} from 'redux';
import reservation from './reservation';
import accountinform from './accountInform';
import plantSetting from './plantSetting'
import customerReservation from './customerReservation';
import statistic from './statistic';
import log from './log';


export default combineReducers({
    authentication, 
    accountinform,
    reservation,
    plantSetting,
    customerReservation,
    log,
    statistic,
    form: formReducer
})