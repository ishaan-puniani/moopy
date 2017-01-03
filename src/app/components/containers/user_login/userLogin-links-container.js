/**
 * Created by ishaan.puniani on 2016-11-27.
 */
import React from 'react';
import {login, getProfile, register} from '../../../api/user-api';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';

import {cookiesGet, cookiesSet} from 'redux-cookies';
import store from '../../../store';

const LoginLinksContainer = React.createClass({
    componentDidMount: function () {
        let authData = store.dispatch(cookiesGet('auth'));
        if (authData) {
            getProfile();
        }
    },
    login: function (event) {
        event.preventDefault();
        login(this.refs.name.value, this.refs.password.value);
    },
    register: function (event) {
        event.preventDefault();
        register(this.refs.name.value, this.refs.password.value);
    },
    logout: function (event) {
        event.preventDefault();
        store.dispatch(cookiesSet('auth',""));
        window.location.href = "/";
    },

    render: function () {
        if (this.props.currentUser.name) {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li><a onClick={this.logout}> Logout <span className="glyphicon glyphicon-log-oun"></span></a></li>
                    <li><Link to="/" activeClassName="active">Hello {this.props.currentUser.name} !</Link></li>
                </ul>
            );
        } else {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#"> Sign Up <span className="glyphicon glyphicon-user"></span></a></li>
                    <li><Link to="/login" activeClassName="active">
                        Login <span className="glyphicon glyphicon-log-in"></span></Link></li>
                </ul>
            );
        }
    }

});


const mapStateToProps = function (store) {
    return {
        currentUser: store.userState.currentUser
    };
};

export default connect(mapStateToProps)(LoginLinksContainer);
