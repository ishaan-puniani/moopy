import axios from 'axios';
import store from '../store';
import { getPeopleSuccess } from '../actions/peoplePicker-actions';

/**
 * Search People
 */
export function searchPeople(query = '') {
  return axios.get('/api/search/suggestions/'+ query)
    .then(response => {
        if(response.data && response.data.success){
            store.dispatch(getPeopleSuccess(response.data));
        }

      return response;
    });
}
