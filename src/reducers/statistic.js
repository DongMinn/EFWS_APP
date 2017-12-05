import * as types from '../actions/ActionTypes';




const initialState = {
    statistic: {
        status: 'EMPTY'//EXIST
    },
    status: {
        getDailyStatistic: '',
    },
    
    dailyStatisticList:[]

};

export default function reservation(state = initialState, action) {
    switch (action.type) {
        case types.STATISTIC_DAILY_PLANT_GET_DATA:
            return {
                ...state,
                statistic: {
                    ...state.statistic,
                    status: 'EXIST'
                },
                status: {
                    ...state.status,
                    getDailyStatistic: 'INIT'
                }
            };
            case types.STATISTIC_DAILY_PLANT_GET_DATA_SUCCESS:
            return{
                ...state,
                status:{
                    ...state.status,
                    getDailyStatistic:'SUCCESS'
                },
                dailyStatisticList:action.statisticList
            };
            case types.STATISTIC_DAILY_PLANT_GET_DATA_FAILURE:
            return{
                ...state,
                status:{
                    ...state.status,
                    getDailyStatistic:'FAILURE'
                }
            };
        default:
            return state;
    }
}
