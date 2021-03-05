import * as type from './action-types';

let initState = {
    userInfo: {
        login: false,
        phone: '',
        address: '',
        username: ''
    },
};

const reducer = (state=initState, action={}) => {
    console.log(state, action)
    switch(action.type){
        case type.GETUSER:
            console.log('获取store数据');
            return state;
        case type.SETUSER:
            console.log('设置store数据');
            return {
                ...state,
                userInfo: action.userInfo
            };            
        default:
            return state;
    }
};

export default reducer;