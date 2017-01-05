/**
 * Created by ishaan.puniani on 2016-11-27.
 */
import React from 'react';
import PeoplePicker from './peoplePicker-form-container';
import {setSelectedPeople} from '../../actions/peoplePicker-actions';
import {createDashboard, updateDashboard} from '../../api/dashboard-api';
import {connect} from 'react-redux';
import store from '../../store';
import {browserHistory} from 'react-router'

const DashboardUpdateContainer = React.createClass({
    isEdit: false,
    componentDidMount: function () {
        const me = this;
        let name = me.props.params.name;
        let selectedDashboard = this.props.dashboard;

        if (name && name.length > 0 && name === selectedDashboard.name) {
            var selectedChildren = selectedDashboard.children;
            store.dispatch(setSelectedPeople(selectedChildren));
            me.isEdit = true;
            me.refs.name.value = name;
            me.refs.internalName.value = name;
        }else{
            //browserHistory.push('/dashboards');
        }
    },

    createGroup: function (event) {
        event.preventDefault();

        createDashboard({
            name: this.refs.name.value,
            selection: this.props.selectedPeople
        });
    },
    updateGroup: function (event) {
        event.preventDefault();

        updateDashboard({
            name: this.refs.name.value,
            selection: this.props.selectedPeople
        });
        browserHistory.goBack();
    },

    render: function () {
        return (
            <div>
                <div className="pageHeader background">
                    <h1>{this.isEdit ? "Update " + this.props.params.name : "Create New" }</h1>
                </div>
                <div className="pageContent background">
                    <form onSubmit={this.createGroup} className="updateDashboardForm">
                        <h4>Dashboard Name</h4>
                        <input type="text" ref="name" placeholder="Name" className={this.isEdit ? 'hidden' : 'name'}/>
                        <input type="text" ref="internalName" readOnly="readOnly" disabled="disabled"
                               className={this.isEdit ? 'name' : 'hidden'}/>
                        <h4>Members</h4>
                        <PeoplePicker />
                        <a className={this.isEdit ? 'hidden' : 'btn btn-primary'} onClick={this.createGroup}>Create</a>
                        <a className={this.isEdit ? 'btn btn-primary' : 'hidden'} onClick={this.updateGroup}>Update</a>
                    </form>
                </div>
            </div>
        );
    }

});


const mapStateToProps = function (store, ownProps) {

    return {
        selectedPeople: store.peoplePickerState.selectedPeople,
        dashboard: store.dashboardState.dashboard

    };
};

export default connect(mapStateToProps)(DashboardUpdateContainer);
