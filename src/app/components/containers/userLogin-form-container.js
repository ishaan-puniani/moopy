/**
 * Created by ishaan.puniani on 2016-11-27.
 */
import React from 'react';
import {login, getProfile, register} from '../../api/user-api';
import {connect} from 'react-redux';
import {cookiesGet} from 'redux-cookies';
import store from '../../store';

const LoginFormContainer = React.createClass({
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

    render: function () {
        if (this.props.currentUser.name) {
            return (
                <div>{this.props.currentUser.name}</div>
            );
        } else {
            return (
                <div>
                    {/*<div className="pageHeader background">
                     <h1>Login</h1>
                     </div>*/}

                    <div className="home-page pageContent background login">
                        <div className="wrapper">
                            <form className="form-signin">
                                <h2 className="form-signin-heading">Please login</h2>
                                <input type="text" className="form-control" ref="name" name="username"
                                       placeholder="Email Address" required="" autofocus=""/>
                                <input type="password" className="form-control" ref="password" name="password"
                                       placeholder="Password" required=""/>
                                <a className="btn btn-lg btn-primary btn-block" onClick={this.login}>Login</a>
                                <a className="btn btn-lg btn-primary btn-block" onClick={this.register}>Register</a>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }

});


const mapStateToProps = function (store) {
    return {
        currentUser: store.userState.currentUser
    };
};

export default connect(mapStateToProps)(LoginFormContainer);
