/**
 * Created by ishaan.puniani on 2016-11-27.
 */
import React from 'react';
import {login} from '../../api/user-api';
import {connect} from 'react-redux';
import {cookiesGet} from 'redux-cookies';
import store from '../../store';
const LoginFormContainer = React.createClass({
    componentDidMount: function () {
        let authData = store.dispatch(cookiesGet('auth'));
        if (authData) {
            authData = JSON.parse(authData);
            if (authData.success) {
                userApi.getProfile(authData.token);
            }
        }
    },
    login: function (event) {
        event.preventDefault();
        login(this.refs.name.value, this.refs.password.value);
    },
    updateGroup: function (event) {
        event.preventDefault();

        /*updateDashboard({
         name: this.refs.name.value,
         selection: this.props.selectedPeople
         });*/
    },

    render: function () {
        if (this.props.currentUser.name) {
            return (
                <div>{this.props.currentUser.name}</div>
            );
        } else {
            return (
                <div>
                    <form onSubmit={this.login} className="">
                        <input type="text" ref="name" placeholder="Name"/>
                        <input type="password" ref="password" placeholder="Password"/>
                        <button>Login</button>
                    </form>
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
