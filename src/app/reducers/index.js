import {combineReducers} from 'redux';

// Reducers
import userReducer from './user-reducer';
import widgetReducer from './widget-reducer';
import searchLayoutReducer from './search-layout-reducer';
import peoplePickerReducer from './peoplePicker-reducer';

// Combine Reducers
var reducers = combineReducers({
    userState: userReducer,
    widgetState: widgetReducer,
    searchLayoutState: searchLayoutReducer,
    peoplePickerState: peoplePickerReducer
});

export default reducers;
