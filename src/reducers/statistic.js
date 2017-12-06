import * as types from '../actions/ActionTypes';




const initialState = {
    statistic: {
        status: 'EMPTY'//EXIST
    },
    status: {
        getDailyStatistic: '',
        getMonthlyStatistic:'',
    },
    
    dailyStatisticList:[],
    monthlyStatisticList:[]

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
            case types.STATISTIC_MONTHLY_PLANT_GET_DATA:
            return {
                ...state,
                statistic: {
                    ...state.statistic,
                    status: 'EXIST'
                },
                status: {
                    ...state.status,
                    getMonthlyStatistic: 'INIT'
                }
            };
            case types.STATISTIC_MONTHLY_PLANT_GET_DATA_SUCCESS:
            return{
                ...state,
                status:{
                    ...state.status,
                    getMonthlyStatistic:'SUCCESS'
                },
                monthlyStatisticList:action.statisticList
            };
            case types.STATISTIC_MONTHLY_PLANT_GET_DATA_FAILURE:
            return{
                ...state,
                status:{
                    ...state.status,
                    getMonthlyStatistic:'FAILURE'
                }
            };
        default:
            return state;
    }
}
