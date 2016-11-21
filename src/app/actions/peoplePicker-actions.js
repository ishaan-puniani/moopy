import * as types from './action-types';

export function getPeopleSuccess(people) {
  return {
    type: types.GET_PEOPLE_SUCCESS,
    people
  };
}

