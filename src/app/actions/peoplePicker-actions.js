import * as types from './action-types';

export function getPeopleSuccess(people) {
    return {
        type: types.GET_PEOPLE_SUCCESS,
        people
    };
}

export function setSelectedPeople(selectedPeople) {
    return {
        type: types.SET_SELECTED_PEOPLE,
        selectedPeople
    };
}

