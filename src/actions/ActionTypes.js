/*계정관련 액션타입*/
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";

export const AUTH_GET_STATUS = "AUTH_GET_STATUS";
export const AUTH_GET_STATUS_SUCCESS = "AUTH_GET_STATUS_SUCCESS";
export const AUTH_GET_STATUS_FAILURE = "AUTH_GET_STATUS_FAILURE";

export const AUTH_CHECK_PASSWORD="AUTH_CHECK_PASSWORD";
export const AUTH_CHECK_PASSWORD_SUCCESS="AUTH_CHECK_PASSWORD_SUCCESS";
export const AUTH_CHECK_PASSWORD_FAILURE="AUTH_CHECK_PASSWORD_FAILURE";


export const AUTH_CHANGE_PASSWORD="AUTH_CHANGE_PASSWORD";
export const AUTH_CHANGE_PASSWORD_SUCCESS="AUTH_CHANGE_PASSWORD_SUCCESS";
export const AUTH_CHANGE_PASSWORD_FAILURE="AUTH_CHANGE_PASSWORD_FAILURE";

export const AUTH_GET_INFORMATION="AUTH_GET_INFORMATION";
export const AUTH_GET_INFORMATION_SUCCESS="AUTH_GET_INFORMATION_SUCCESS";
export const AUTH_GET_INFORMATION_FAILURE="AUTH_GET_INFORMATION_FAILURE";

export const AUTH_GET_STORE_INFORMATION="AUTH_GET_STORE_INFORMATION";
export const AUTH_GET_STORE_INFORMATION_SUCCESS="AUTH_GET_STORE_INFORMATION_SUCCESS";
export const AUTH_GET_STORE_INFORMATION_FAILURE="AUTH_GET_STORE_INFORMATION_FAILURE";

export const AUTH_CHANGE_INFORMATION="AUTH_CHANGE_INFORMATION";
export const AUTH_CHANGE_INFORMATION_SUCCESS="AUTH_CHANGE_INFORMATION_SUCCESS";
export const AUTH_CHANGE_INFORMATION_FAILURE="AUTH_CHANGE_INFORMATION_FAILURE";

export const AUTH_SET_STORE_SETTING_INFORMATION="AUTH_SET_STORE_SETTING_INFORMATION"
export const AUTH_SET_STORE_SETTING_INFORMATION_SUCCESS="AUTH_SET_STORE_SETTING_INFORMATION_SUCCESS"
export const AUTH_SET_STORE_SETTING_INFORMATION_FAILURE="AUTH_SET_STORE_SETTING_INFORMATION_FAILURE"

export const AUTH_GET_STORE_SETTING_INFORMATION="AUTH_GET_STORE_SETTING_INFORMATION"
export const AUTH_GET_STORE_SETTING_INFORMATION_SUCCESS="AUTH_GET_STORE_SETTING_INFORMATION_SUCCESS"
export const AUTH_GET_STORE_SETTING_INFORMATION_FAILURE="AUTH_GET_STORE_SETTING_INFORMATION_FAILURE"

export const AUTH_LOGOUT="AUTH_LOGOUT";

/*
 *예약관련 액션 타입
 */
export const RESERVE_GET_DATA="RESERVE_GET_DATA"
export const RESERVE_GET_DATA_SUCCESS="RESERVE_GET_DATA_SUCCESS"
export const RESERVE_GET_DATA_FAILURE="RESERVE_GET_DATA_FAILURE"

export const RESERVE_SET_ONLINE="RESERVE_SET_ONLINE";
export const RESERVE_SET_ONLINE_SUCCESS="RESERVE_SET_ONLINE_SAVE";
export const RESERVE_SET_ONLINE_FAILURE="RESERVE_SET_ONLINE_FAILURE";

export const RESERVE_UPDATE_DATA="RESERVE_UPDATE_DATA"
export const RESERVE_UPDATE_DATA_SUCCESS="RESERVE_UPDATE_DATA_SUCCESS"
export const RESERVE_UPDATE_DATA_FAILURE="RESERVE_UPDATE_DATA_FAILURE"

export const RESERVE_PUT_DATA="RESERVE_PUT_DATA"
export const RESERVE_PUT_DATA_SUCCESS="RESERVE_PUT_DATA_SUCCESS"
export const RESERVE_PUT_DATA_FAILURE="RESERVE_PUT_DATA_FAILURE"

export const RESERVE_GET_TOTAL_DATA="RESERVE_GET_TOTAL_DATA"
export const RESERVE_GET_TOTAL_DATA_SUCCESS="RESERVE_GET_TOTAL_DATA_SUCCESS"
export const RESERVE_GET_TOTAL_DATA_FAILURE="RESERVE_GET_TOTAL_DATA_FAILURE"

export const RESERVE_GET_BYTABLE_DATA="RESERVE_GET_BYTABLE_DATA"
export const RESERVE_GET_BYTABLE_DATA_SUCCESS="RESERVE_GET_BYTABLE_DATA_SUCCESS"
export const RESERVE_GET_BYTABLE_DATA_FAILURE="RESERVE_GET_BYTABLE_DATA_FAILURE"

export const RESERVE_GET_STATE_DATA="RESERVE_GET_STATE_DATA"
export const RESERVE_GET_NOSHOW_DATA_SUCCESS="RESERVE_GET_NOSHOW_DATA_SUCCESS"
export const RESERVE_GET_CANCEL_DATA_SUCCESS="RESERVE_GET_CANCEL_DATA_SUCCESS"
export const RESERVE_GET_STATE_DATA_FAILURE="RESERVE_GET_STATE_DATA_FAILURE"

export const RESERVE_GET_HISTORY_DATA="RESERVE_GET_HISTORY_DATA"
export const RESERVE_GET_HISTORY_DATA_SUCCESS="RESERVE_GET_HISTORY_DATA_SUCCESS"
export const RESERVE_GET_HISTORY_DATA_FAILURE="RESERVE_GET_HISTORY_DATA_FAILURE"

/*
 * 매장세팅 타입
 */
export const PLANTSETTING_GET_DATA="PLANTSETTING_GET_DATA"
export const PLANTSETTING_GET_DATA_SUCCESS="PLANTSETTING_GET_DATA_SUCCESS"
export const PLANTSETTING_GET_DATA_FAILURE="PLANTSETTING_GET_DATA_FAILURE"

export const PLANTSETTING_UPDATE_DATA="PLANTSETTING_UPDATE_DATA"
export const PLANTSETTING_UPDATE_DATA_SUCCESS="PLANTSETTING_UPDATE_DATA_SUCCESS"
export const PLANTSETTING_UPDATE_DATA_FAILURE="PLANTSETTING_UPDATE_DATA_FAILURE"

export const PLANTSETTING_UPDATE_DATA_FAILURE_BY_RESERVEDATA="PLANTSETTING_UPDATE_DATA_FAILURE_BY_RESERVEDATA"

export const PLANTSETTING_GET_NOSHOW_DATA="PLANTSETTING_GET_NOSHOW_DATA"
export const PLANTSETTING_GET_NOSHOW_DATA_SUCCESS="PLANTSETTING_GET_NOSHOW_DATA_SUCCESS"
export const PLANTSETTING_GET_NOSHOW_DATA_FAILURE="PLANTSETTING_GET_NOSHOW_DATA_FAILURE"

export const PLANTSETTING_UPDATE_NOSHOW_DATA="PLANTSETTING_UPDATE_NOSHOW_DATA"
export const PLANTSETTING_UPDATE_NOSHOW_DATA_SUCCESS="PLANTSETTING_UPDATE_NOSHOW_DATA_SUCCESS"
export const PLANTSETTING_UPDATE_NOSHOW_DATA_FAILURE="PLANTSETTING_UPDATE_NOSHOW_DATA_FAILURE"

export const PLANTSETTING_GET_ALARM_DATA="PLANTSETTING_GET_ALARM_DATA"
export const PLANTSETTING_GET_ALARM_DATA_SUCCESS="PLANTSETTING_GET_ALARM_DATA_SUCCESS"
export const PLANTSETTING_GET_ALARM_DATA_FAILURE="PLANTSETTING_GET_ALARM_DATA_FAILURE"

export const PLANTSETTING_UPDATE_ALARM_DATA="PLANTSETTING_UPDATE_ALARM_DATA"
export const PLANTSETTING_UPDATE_ALARM_DATA_SUCCESS="PLANTSETTING_UPDATE_ALARM_DATA_SUCCESS"
export const PLANTSETTING_UPDATE_ALARM_DATA_FAILURE="PLANTSETTING_UPDATE_ALARM_DATA_FAILURE"

export const PLANTSETTING_UPDATE_DATA_FAILURE_BY_ALARMDATA="PLANTSETTING_UPDATE_DATA_FAILURE_BY_ALARMDATA"

/*
 *고객전용 예약 데이터 타입 
 */
export const CUSTOMER_RESERVE_GET_DATA="CUSTOMER_RESERVE_GET_DATA"
export const CUSTOMER_RESERVE_GET_DATA_SUCCESS="CUSTOMER_RESERVE_GET_DATA_SUCCESS"
export const CUSTOMER_RESERVE_GET_DATA_FAILURE="CUSTOMER_RESERVE_GET_DATA_FAILURE"

export const CUSTOMER_LOGIN="CUSTOMER_LOGIN"
export const CUSTOMER_LOGIN_SUCCESS="CUSTOMER_LOGIN_SUCCESS"
export const CUSTOMER_LOGIN_FAILURE="CUSTOMER_LOGIN_FAILURE"

/**
 * 통계 타입
 * 
 */
export const STATISTIC_DAILY_PLANT_GET_DATA="STATISTIC_DAILY_PLANT_GET_DATA"
export const STATISTIC_DAILY_PLANT_GET_DATA_SUCCESS="STATISTIC_DAILY_PLANT_GET_DATA_SUCCESS"
export const STATISTIC_DAILY_PLANT_GET_DATA_FAILURE="STATISTIC_DAILY_PLANT_GET_DATA_FAILURE"

export const STATISTIC_MONTHLY_PLANT_GET_DATA="STATISTIC_MONTHLY_PLANT_GET_DATA"
export const STATISTIC_MONTHLY_PLANT_GET_DATA_SUCCESS="STATISTIC_MONTHLY_PLANT_GET_DATA_SUCCESS"
export const STATISTIC_MONTHLY_PLANT_GET_DATA_FAILURE="STATISTIC_MONTHLY_PLANT_GET_DATA_FAILURE"


/**
 * 기타 액션타입
 */
export const AUTH_SET_CURRENTINFORM="AUTH_SET_CURRENTINFORM";

export const LOAD = "LOAD_DATA";
export const DELDATA = "DEL_DATA";
export const LOAD_ALARM="LOAD_ALARM"
