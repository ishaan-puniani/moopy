import * as types from './action-types';


/*
* // Dashboard
 export const CREATE_DASHBOARD = 'CREATE_DASHBOARD';
 export const UPDATE_DASHBOARD = 'UPDATE_DASHBOARD';
 export const GET_MY_DASHBOARDS = 'GET_MY_DASHBOARDS';
 export const GET_SUBSCRIBED_DASHBOARDS = 'GET_SUBSCRIBED_DASHBOARDS';
 export const GET_ALL_DASHBOARDS = 'GET_ALL_DASHBOARDS';
 */

export function createDashboardSuccess(dashboard) {
    return {
        type: types.CREATE_DASHBOARD,
        dashboard
    };
}
export function updateDashboardSuccess(dashboard) {
    return {
        type: types.UPDATE_DASHBOARD,
        dashboard
    };
}
export function getAllDashboardsSuccess(dashboards) {
    return {
        type: types.GET_ALL_DASHBOARDS,
        dashboards
    };
}
export function getDashboardSuccess(dashboard) {
    return {
        type: types.GET_DASHBOARD,
        dashboard
    };
}
export function setDashboardUsersForMoodSynch(users) {
    return {
        type: types.SET_DASHBOARD_USERS_FOR_MOOD_SYNC,
        users
    };
}

export function getUsersMoodSynchSucess(moods) {
    return {
        type: types.GET_DASHBOARD_USERS_FOR_MOOD_SYNC,
        moods
    };
}
export function dashboardMoodDetailsSuccess(moods) {
    return {
        type: types.GET_DASHBOARD_MOOD_DETAILS,
        moods
    };
}

