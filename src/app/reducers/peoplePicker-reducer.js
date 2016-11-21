import * as types from '../actions/action-types';

const initialState = {
    selectedPeople: null,
    people: null,
    reposMessage: 'Type at least one character to get suggestions',
    reposMore: null
};

const peoplePickerReducer = function (state = initialState, action) {
    debugger;
    switch (action.type) {

        case types.GET_PEOPLE_SUCCESS:
            return Object.assign({}, state, {
                selectedPeople: null,
                people: action.people,
                reposMessage: 'Type at least one character to get suggestions',
                reposMore: null
            });
    }

    return state;

}

export default peoplePickerReducer;
