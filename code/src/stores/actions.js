import * as action from './action-types';

export const getUserMsg = () => {
    return {
      type: action.GETUSER,
    };
};

export const setUserMsg = (userInfo) => {
    return {
      type: action.SETUSER,
      userInfo
    };
};
