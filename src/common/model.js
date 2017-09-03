import { upper } from './validation';


export const ChangeInfoField =[
    {
        name: 'plantName',
        label:'매장명'
    },
    {
        name: 'plantTelNo',
        label: '매장번호'
    },
    {
        name: 'noticeDescription',
        label: '설명'
    }
];

export const ChangePasswordField =[
    {
        name: 'password',
        label:'기존비밀번호'
    },
    {
        name: 'newPassword',
        label: '신규비밀번호'
    },
    {
        name: 'checkedPassword',
        label: '비밀번호확인'
    }
];



export const LoginField=[
    {
        name: 'id',
        type: 'text',
        label: '아이디',
        normalize: upper
    },
    {
         name: 'password',
         type: 'password',
         label: '비밀번호'
    }
];

export const plantSettingField=[
    {
        name:'tableType',
        type:'text',
        label:'테이블타입'
    },
    {
        name:'tableUseChk',
        type:'checkbox',
        label:'사용여부'
    },
    {
        name:'tableWaitTime',
        type:'text',
        label:'테이블세팅시간'
    }
];