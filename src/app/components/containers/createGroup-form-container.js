/**
 * Created by ishaan.puniani on 2016-11-27.
 */
import React from 'react';
import PeoplePicker from './peoplePicker-form-container';
import {createDashboard, updateDashboard} from '../../api/dashboard-api';
import {connect} from 'react-redux';

const CreateGroupFormContainer = React.createClass({

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


const mapStateToProps = function (store) {
    return {
        selectedPeople: store.peoplePickerState.selectedPeople
    };
};

export default connect(mapStateToProps)(CreateGroupFormContainer);
