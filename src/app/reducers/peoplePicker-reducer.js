import * as types from '../actions/action-types';

const initialState = {
    selectedPeople: [],
    people: null,
    reposMessage: 'Type at least one character to get suggestions',
    reposMore: null
};

const peoplePickerReducer = function (state = initialState, action) {
    switch (action.type) {

        case types.GET_PEOPLE_SUCCESS:
            return Object.assign({}, state, {
                people: action.people,
                reposMessage: 'Type at least one character to get suggestions',
                reposMore: null
            });
            case types.SET_SELECTED_PEOPLE:
            return Object.assign({}, state, {
                selectedPeople: action.selectedPeople
            });
    }

    return state;

}

export default peoplePickerReducer;
