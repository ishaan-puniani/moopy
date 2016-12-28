import * as types from './action-types';

export function getUsersSuccess(users) {
  return {
    type: types.GET_USERS_SUCCESS,
    users
  };
}

export function deleteUserSuccess(userId) {
  return {
    type: types.DELETE_USER_SUCCESS,
    userId
  };
}

export function userProfileSuccess(userProfile) {
  return {
    type: types.USER_PROFILE_SUCCESS,
    userProfile
  };
}
export function userMoodsSuccess(userMoods) {
    return {
        type: types.USER_MOOD_SUCCESS,
        userMoods
    };
}
export function userLoginSuccess(user) {
    return {
        type: types.LOGIN_SUCCESS,
        user
    };
}