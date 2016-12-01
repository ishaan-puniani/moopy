import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    dashboards: [],
    dashboard: {
        children: []
    }
};

const dashboardReducer = function (state = initialState, action) {
    debugger;
    switch (action.type) {

        case types.GET_ALL_DASHBOARDS:
            return Object.assign({}, state, {dashboards: action.dashboards});

        case types.GET_DASHBOARD:
            return Object.assign({}, state, {dashboard: action.dashboard});

        case types.DELETE_WIDGET_SUCCESS:

            // Use lodash to create a new widget array without the widget we want to remove
            const newWidgets = _.filter(state.widgets, widget => widget.id != action.widgetId);
            return Object.assign({}, state, {widgets: newWidgets})

    }

    return state;

}

export default dashboardReducer;
