import React from 'react';
import ReactDOM from 'react-dom';

import { App, Login, Change, ChangePassword, ChangeInformation
        , ReservationState, CustomerReservationState 
         , PlantSettingTab  , ReservationListTab} from './containers';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import registerServiceWorker from './registerServiceWorker';

// import './css/fonts.scss';

injectTapEventPlugin();

// let middleware = [thunk , logger];
let middleware = [thunk];

const store = createStore(reducers , applyMiddleware(...middleware));

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={browserHistory}>
                <Route path="reservationdata/:loginId/:reservationNo" component={CustomerReservationState}>
                    <Redirect from="reservationdata/:loginId/:reservationNo/*" to="reservationdata/:loginId/:reservationNo/" />
                </Route>
                <Route path="/" component={App}>
                    <IndexRoute component={Login} />
                 
                    <Route path="change" component={Change}>
                        <Route path="password" component={ChangePassword} />
                        <Route path="information" component={ChangeInformation} />
                        <Route path="setting" component={PlantSettingTab} />
                        
                    </Route>
                    <Route path="reservestatelist" component={ReservationListTab} >        
                    </Route>
                    <Route path="statistics" component={ReservationListTab} >        
                    </Route>
                    <Route path="reservationstate" component={ReservationState} />
                <Redirect from="/*" to="/" />
                </Route>
                
            </Router>
        </MuiThemeProvider>
    </Provider>, document.getElementById('root')
);
registerServiceWorker();
