/**
 * Created by ishaan.puniani on 2016-11-20.
 */

import React from 'react';
import {connect} from 'react-redux';
import * as peopleApi from '../../api/peoplePicker-api';
import Autosuggest, {ItemAdapter} from 'react-bootstrap-autosuggest'
import store from '../../store';
import {setSelectedPeople} from '../../actions/peoplePicker-actions';


class RepoAdapter extends ItemAdapter {
    newFromValue(name) {
        return {name}
    }

    renderSelected(item) {
        var name = item.name || item;
        return <div className="tag" key={name}>
            {name} {item.img && <img src={item.img}/>}
        </div>
    }

    renderSuggested(item) {
        var name = item.name || item;
        return <div className="tag-item" key={name}>
            {item.img && <img src={item.img}/>} {name}
        </div>
    }

    /*itemIncludedByInput() {
     return true // don't perform client filtering; show all server items
     }

     sortItems(items) {
     return items // don't sort items; just use server ordering
     }

     renderItem(item) {
     debugger
     return <div className="tag-item">
     {item.img && <img src={item.img}/>} {item.value}
     </div>
     }*/
}
RepoAdapter.instance = new RepoAdapter();
const PeoplePickerFormContainer = React.createClass({
    selectedPeople: [],
    onAdd: function (item) {
        var me = this;
        me.selectedPeople.push(item.name);
        store.dispatch(setSelectedPeople(me.selectedPeople));
    },
    onRemove: function (itemIdxRemoved) {
        var me = this;
        me.selectedPeople.splice(itemIdxRemoved, 1);
        store.dispatch(setSelectedPeople(me.selectedPeople));
    },
    onRepoChange: function (value) {
        //console.log("onRepoChange");
    },
    onRepoSearch: function (value) {
        if (value.length > 1) {
            peopleApi.searchPeople(value);
        }
    },
    render: function () {
        this.selectedPeople = this.props.selectedPeople;
        return (
            <Autosuggest
                datalist={this.props.people}
                datalistPartial
                datalistMessage={this.props.reposMessage}
                onDatalistMessageSelect={this.props.reposMore}
                placeholder="Search People Or Group.."
                value={this.props.selectedPeople}
                itemAdapter={RepoAdapter.instance}
                itemValuePropName="name"
                multiple
                allowDuplicates={false}
                searchDebounce={500}
                onSearch={this.onRepoSearch}
                onChange={this.onRepoChange}
                onAdd={this.onAdd}
                onRemove={this.onRemove}
            />
        );
    }
});


const mapStateToProps = function (store) {
    return {
        selectedPeople: store.peoplePickerState.selectedPeople,
        people: store.peoplePickerState.people,
        reposMessage: store.peoplePickerState.reposMessage,//'Type at least one character to get suggestions',
        reposMore: store.peoplePickerState.reposMore
    };
};

export default connect(mapStateToProps)(PeoplePickerFormContainer);
