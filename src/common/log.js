import axios from 'axios';

export function logSaveRequest(level, desc) {
    //login api  시작
    
    axios.post('/log/adminweb/save', {
        level: level,
        desc: desc
    }).then((response) => {
        if (response.status === 200) {
            if (response.data.status === 200) {
                if (response.data.remainingList === undefined) {
                    return false;
                } else {
                    // console.log('예약 데이터 불러오기 성공')
                    return true;
                }
            }
        }
    }).catch((error) => {
        console.log('DEBUG: log request failed!');
        if (error.response.data.status === 500) {
            if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                return -1;
            }
        }
        return false;
    });
}

// (level 파라미터 값은: INFO, DEBUG, WARN, ERbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbROR)
// {
//   "level": "DEBUG",  
//   "desc": "로그 남기기 테스트"
// }bbbbbb

