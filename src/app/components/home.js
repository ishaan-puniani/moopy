import React from 'react';
//import Chart from "chart.js" ;
import {Line as LineChart} from 'react-chartjs';
//const LineChart = require('react-chartjs').Line;
import PeoplePicker from './containers/peoplePicker-form-container'

import Autosuggest, {ItemAdapter} from 'react-bootstrap-autosuggest'

import CreateGroup from './containers/createGroup-form-container'
import {Button} from 'react-bootstrap';

const predefinedTags = [
    {value: 'Good', img: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.1.4/assets/png/1f607.png'},
    {value: 'Evil', img: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.1.4/assets/png/1f608.png'},
    {value: 'Confused', img: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.1.4/assets/png/1f615.png'},
    {value: 'Ugly', img: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.1.4/assets/png/1f4a9.png'}
]

class TagAdapter extends ItemAdapter {
    newFromValue(value) {
        return {value}
    }

    renderSelected(item) {
        return <div className="tag">
            {item.value} {item.img && <img src={item.img}/>}
        </div>
    }

    renderSuggested(item) {
        return <div className="tag-item">
            {item.img && <img src={item.img}/>} {item.value}
        </div>
    }
}
TagAdapter.instance = new TagAdapter()

const Home = React.createClass({
    selectedItems: [],
    save: function () {
        // let items = this.refs.peoplePicker.getSelectedItems()
        // alert(items );

    },

    rand:function(min, max, num) {
        var rtn = [];
        while (rtn.length < num) {
            rtn.push((Math.random() * (max - min)) + min);
        }
        return rtn;
    },
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [5, 8, 2, 0, 1, 2, 0]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [-2, -5, 0, -3, -1, 0, -1]
            }
        ]
    },


    render: function () {
        return (
            <div className="home-page">
                <Button bsStyle="primary">Primary</Button>
                <h1>The app is now using Redux</h1>
                <LineChart data={this.data} width="600" height="250"/>

                {/*<Autosuggest
                 datalist={['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Rev.', 'Prof.']}
                 placeholder="Name prefix"
                 />*/}


                {/*  <Autosuggest
                 bsSize="small"
                 datalist={predefinedTags}
                 datalistOnly={true}
                 multiple
                 allowDuplicates={true}
                 placeholder="Pick some tags..."
                 //value={tags}
                 itemAdapter={TagAdapter.instance}
                 //buttonAfter={!multiLine && <Button onClick={onClear}>&times;</Button>}
                 //showToggle={!multiLine}
                 //    onChange={onChange}
                 />*/}


                <p>
                    While the <a href="#">CSS-Tricks article</a> for
                    this guide covers an explanation of <strong>Redux</strong>, there
                    are still many implementation details in this code that the article
                    doesn't cover. For a better understanding of those details, see
                    the <a href="https://github.com/bradwestfall/CSS-Tricks-React-Series">Github documentation</a> for
                    this guide.
                </p>
                {/* <PeoplePicker ref="peoplePicker"/>
                 <button onClick={this.save} >Test</button>*/}

                <hr />
                <CreateGroup />
            </div>
        );
    }
});

export default Home;
