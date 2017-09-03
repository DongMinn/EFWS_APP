import React from 'react';
import ReactDOM from 'react-dom';

import { App, Login, Change, ChangePassword, ChangeInformation
        , ReservationState, CustomerReservationState 
         , PlantSettingTab} from './containers';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

let middleware = [thunk , logger];
// let middleware = [thunk];

const store = createStore(reducers , applyMiddleware(...middleware));

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={browserHistory}>
                <Route path="reservationdata/:loginId/:customerCellPhone" component={CustomerReservationState}>
                    <Redirect from="reservationdata/:loginId/:customerCellPhone/*" to="reservationdata/:loginId/:customerCellPhone/" />
                </Route>
                <Route path="/" component={App}>
                    <IndexRoute component={Login} />
                    <Route path="login" component={Login} />
                    <Route path="change" component={Change}>
                        <Route path="password" component={ChangePassword} />
                        <Route path="information" component={ChangeInformation} />
                        <Route path="setting" component={PlantSettingTab} />
                    </Route>
                    <Route path="reservationstate" component={ReservationState} />
                <Redirect from="/*" to="/" />
                </Route>
                
            </Router>
        </MuiThemeProvider>
    </Provider>, document.getElementById('root')
);

