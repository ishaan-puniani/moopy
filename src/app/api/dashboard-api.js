/**
 * Created by ishaan.puniani on 2016-11-29.
 */
import axios from 'axios';
import store from '../store';
import {
    createDashboardSuccess,
    updateDashboardSuccess,
    getAllDashboardsSuccess,
    getDashboardSuccess,
    setDashboardUsersForMoodSynch,
    getUsersMoodSynchSucess
} from '../actions/dashboard-actions';

/**
 * Dashboard People
 */
export function createDashboard(data) {
    return axios.post('/api/dashboard/create', data)
        .then(response => {
            store.dispatch(createDashboardSuccess(response.data));
            return response;
        });
}
export function updateDashboard(data) {
    return axios.post('/api/dashboard/update', data)
        .then(response => {
            store.dispatch(updateDashboardSuccess(response.data));
            return response;
        });
}

export function getAllDashboards() {
    return axios.get('/api/dashboard')
        .then(response => {
            store.dispatch(getAllDashboardsSuccess(response.data));
            if (response.data) {
                let toTrack = response.data.map(function (dashboard) {
                    return dashboard.name;
                });
                if (toTrack) {
                    store.dispatch(setDashboardUsersForMoodSynch(toTrack));
                }
            }
            return response;
        });
}
export function getDashboard(name) {
    return axios.get('/api/dashboard/' + name)
        .then(response => {
            store.dispatch(getDashboardSuccess(response.data));
            if (response.data) {
                let toTrack = [response.data.name];
                if (response.data.children) {
                    toTrack = toTrack.concat(response.data.children);
                }
                store.dispatch(setDashboardUsersForMoodSynch(toTrack));
            }
            return response;
        });
}

export function getMoods(names) {
    return axios.post('/api/moods', names)
        .then(response => {
            store.dispatch(getUsersMoodSynchSucess(response.data));
            return response;
        });
}