import Cookies from 'js-cookie';
import {createStore, applyMiddleware} from 'redux';
import {getCookiesMiddleware} from 'redux-cookies';
import reducers from './reducers';

const store = createStore(reducers,
    applyMiddleware(getCookiesMiddleware(Cookies)));
export default store;
