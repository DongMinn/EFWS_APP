import * as types from './ActionTypes';
import axios from 'axios';



export const dailyPlantstatisticGetDataRequest = (plantCode , startDate , endDate) => {
    return (dispatch) => {
        //login api  시작


        dispatch(dailyPlantstatisticGetData());
        return axios.post('/statistic/plant/daily', {
            plantCode: plantCode,
            startDate: startDate,
            endDate: endDate
        }).then((response) => {

            if (response.status === 200) {
                if (response.data.status === 200) {

                    if (response.data.statisticList === undefined) {
                        dispatch(dailyPlantstatisticGetDataSuccess([]));
                        return false;
                    } else {
                        dispatch(dailyPlantstatisticGetDataSuccess(response.data.statisticList));
                        // console.log('예약 데이터 불러오기 성공')
                        return true;
                    }
                }
            }

        }).catch((error) => {

            dispatch(dailyPlantstatisticGetDataFailure());
            console.log('DEBUG: Reserve request failed!');
            if (error.response.data.status === 500) {

                if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                    return -1;
                }
            }
            return false;
        });
    }
}



export const monthlyPlantstatisticGetDataRequest = (plantCode , saleYear) => {
    return (dispatch) => {
        //login api  시작
   

        dispatch(monthlyPlantstatisticGetData());
        return axios.post('/statistic/plant/monthly', {
            plantCode: plantCode,
            saleYear: saleYear
        }).then((response) => {

            if (response.status === 200) {
                if (response.data.status === 200) {

                    if (response.data.statisticList === undefined) {
                        dispatch(monthlyPlantstatisticGetDataSuccess([]));
                        return false;
                    } else {
                        dispatch(monthlyPlantstatisticGetDataSuccess(response.data.statisticList));
                        // console.log('예약 데이터 불러오기 성공')
                        return true;
                    }
                }
            }

        }).catch((error) => {

            dispatch(monthlyPlantstatisticGetDataFailure());
            console.log('DEBUG: Reserve request failed!');
            if (error.response.data.status === 500) {

                if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                    return -1;
                }
            }
            return false;
        });
    }
}



export const dailyPlantstatisticGetData = () => ({
    type: types.STATISTIC_DAILY_PLANT_GET_DATA
})

export const dailyPlantstatisticGetDataSuccess = (dailystatisticList) => ({
    type: types.STATISTIC_DAILY_PLANT_GET_DATA_SUCCESS,
    dailystatisticList
})

export const dailyPlantstatisticGetDataFailure = () => ({
    type: types.STATISTIC_DAILY_PLANT_GET_DATA_FAILURE
})


export const monthlyPlantstatisticGetData = () => ({
    type: types.STATISTIC_MONTHLY_PLANT_GET_DATA
})

export const monthlyPlantstatisticGetDataSuccess = (monthlystatisticList) => ({
    type: types.STATISTIC_MONTHLY_PLANT_GET_DATA_SUCCESS,
    monthlystatisticList
})

export const monthlyPlantstatisticGetDataFailure = () => ({
    type: types.STATISTIC_MONTHLY_PLANT_GET_DATA_FAILURE
})
