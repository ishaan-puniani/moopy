/**
 * Created by ishaan.puniani on 2016-11-29.
 */
import axios from 'axios';
import store from '../store';
import {createDashboardSuccess, updateDashboardSuccess, getAllDashboardsSuccess, getDashboardSuccess} from '../actions/dashboard-actions';

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

export function getAllDashboards(data) {
    return axios.get('/api/dashboard', data)
        .then(response => {
            store.dispatch(getAllDashboardsSuccess(response.data));
            return response;
        });
}
export function getDashboard(name) {
    return axios.get('/api/dashboard/' + name)
        .then(response => {
            store.dispatch(getDashboardSuccess(response.data));
            return response;
        });
}