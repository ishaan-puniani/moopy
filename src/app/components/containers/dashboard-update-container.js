/**
 * Created by ishaan.puniani on 2016-11-27.
 */
import React from 'react';
import PeoplePicker from './peoplePicker-form-container';
import {setSelectedPeople} from '../../actions/peoplePicker-actions';
import {connect} from 'react-redux';
import store from '../../store';

const DashboardUpdateContainer = React.createClass({
    componentDidMount: function () {
        let name = this.props.params.name;
        let selectedDashboard = this.props.dashboard;
        if (name.length>0 && name === selectedDashboard.name) {
            var selectedChildren = selectedDashboard.children.map(function(child){return {value:child}});
            store.dispatch(setSelectedPeople(selectedChildren));
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
    },

    render: function () {
        return (
            <div>
                <form onSubmit={this.createGroup} className="">
                    <input type="text" ref="name" placeholder="Name"/>
                    <PeoplePicker />
                    <button>Create</button>
                    <a onClick={this.updateGroup}>Update</a>
                </form>
            </div>
        );
    }

});


const mapStateToProps = function (store, ownProps) {

    return {
        selectedPeople: store.peoplePickerState.selectedPeople,
        dashboard: store.dashboardState.dashboard,

    };
};

export default connect(mapStateToProps)(DashboardUpdateContainer);
