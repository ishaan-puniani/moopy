import axios from 'axios';
import store from './store';
import {cookiesGet} from 'redux-cookies';

axios.defaults.headers.common['x-access-token'] = store.dispatch(cookiesGet('auth'));
export default axios;
