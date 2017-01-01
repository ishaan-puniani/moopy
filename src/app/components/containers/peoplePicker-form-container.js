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
    newFromValue(value) {
        return {value}
    }

    renderSelected(item) {
        return <div className="tag" key={item.value}>
            {item.value} {item.img && <img src={item.img}/>}
        </div>
    }

    renderSuggested(item) {
        return <div className="tag-item" key={item.value}>
            {item.img && <img src={item.img}/>} {item.value}
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


let lastSearch;

/*
 function onRepoSearch(search, page, prev) { // $fold-line$
 if (search) {
 // GitHub search doesn't allow slashes, so strip off user prefix
 const sp = search.lastIndexOf('/')
 if (sp >= 0) {
 search = search.substring(sp + 1)
 }

 // ignore redundant searches where only the user prefix changed
 if (search === lastSearch && !page) {
 return
 }
 lastSearch = search

 setState({
 reposMessage: 'Searching for matching repositories...',
 reposMore: null
 })
 let url = 'https://api.github.com/search/repositories?q=' +
 encodeURIComponent(search)
 if (page) {
 url += '&page=' + page
 }
 fetch(url).then(response => {
 if (response.ok) {
 response.json().then(json => {
 let repos, reposMessage, reposMore
 if (json.total_count === 0) {
 reposMessage = 'No matching repositories'
 } else {
 repos = prev ? prev.concat(json.items) : json.items
 if (repos.length < json.total_count) {
 reposMessage = 'Load more...'
 reposMore = () => onRepoSearch(search, page ? page + 1 : 2, repos)
 }
 }
 setState({
 repos,
 reposMessage,
 reposMore
 })
 })
 } else {
 setState({
 repos: null,
 reposMessage: 'Repository search returned error: ' + response.statusText,
 reposMore: null
 })
 }
 }, err => {
 setState({
 repos: null,
 reposMessage: 'Repository search failed: ' + err.message,
 reposMore: null
 })
 })
 } else {
 setState({
 repos: null,
 reposMessage: 'Type at least one character to get suggestions',
 reposMore: null
 })
 }
 }

 function onRepoChange(value) {
 setState({repo: value})
 }
 */


const PeoplePickerFormContainer = React.createClass({
    selectedPeople: [],
    onAdd: function (item) {
        var me = this;
        me.selectedPeople.push(item);
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
        this.selectedPeople= this.props.selectedPeople;
        return (
            <Autosuggest
                datalist={this.props.people}
                datalistPartial
                datalistMessage={this.props.reposMessage}
                onDatalistMessageSelect={this.props.reposMore}
                placeholder="Search People Or Group.."
                value={this.props.selectedPeople}
                itemAdapter={RepoAdapter.instance}
                itemValuePropName="value"
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
