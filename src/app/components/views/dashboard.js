import React from 'react';
import {Link} from 'react-router';
import {HorizontalBar} from 'react-chartjs-2';
import {browserHistory} from 'react-router'
import {moodCssClassForColor} from '../../utils/utils';
import {ProgressBar} from 'react-bootstrap';
import {askForMood} from '../../api/dashboard-api';


// Using "Stateless Functional Components"
export default function (props) {
    /* var names = [], moods = [];
     if (props.dashboard.children) {
     names = props.dashboard.children;
     names.forEach(function (name, index, array) {
     moods.push(props.moods[name] ? props.moods[name].mood : 0)
     });
     }

     var average = 0;
     if (props.moods && props.dashboard.name && props.moods[props.dashboard.name] && props.moods[props.dashboard.name].mood) {
     average = props.moods[props.dashboard.name].mood;
     }
     var dataOfDashboard = {
     labels: ["Avg"],
     datasets: [{
     label: 'Overall',
     backgroundColor: 'rgba(255,99,132,0.2)',
     borderColor: 'rgba(255,99,132,1)',
     borderWidth: 1,
     hoverBackgroundColor: 'rgba(255,99,132,0.4)',
     hoverBorderColor: 'rgba(255,99,132,1)',
     data: [average]
     }]
     };

     var dataOfChildren = {
     labels: names,
     datasets: [{
     label: 'Mood',
     backgroundColor: 'rgba(255,99,132,0.2)',
     borderColor: 'rgba(255,99,132,1)',
     borderWidth: 1,
     hoverBackgroundColor: 'rgba(255,99,132,0.4)',
     hoverBorderColor: 'rgba(255,99,132,1)',
     data: moods
     }]
     };
     var option = {
     maintainAspectRatio: false,
     barThickness: 10,
     scales: {
     xAxes: [{
     ticks: {
     max: 5,
     min: 0
     }
     }]
     }
     };
     var height = 50 * (1 + names.length);

     var childrenChartStyle = {
     height: height + 100
     }

     var elementClick = function (elems) {
     browserHistory.push('/users/1')
     }*/
    var askMembers = function (e) {
        askForMood(props.dashboard.name)
    };

    var moodValue = (props.moods[props.dashboard.name] ? props.moods[props.dashboard.name].mood : 0), mood = 20 * moodValue;
    var moodImage = "/images/" + parseInt(moodValue) + ".png";
    var cssClass = moodCssClassForColor(mood);

    return (
        <div className="dashboard-details">
            <div className="details">
                <div className="pageHeader background">
                    <h1>{props.dashboard.name} <img className="dashboardMoodImg" src={moodImage} alt="mood"/></h1>
                    <div>
                        <ProgressBar now={mood} label={`${mood}`}  bsStyle={cssClass}/>
                    </div>
                    <div>

                        <Link className="btn btn-default" to={'/' + props.dashboard.name + '/edit'}>EDIT</Link>
                        <Link className="btn btn-primary"
                              to={'/dashboards/' + props.dashboard.name + '/details'}>Details</Link>
                        <div className="span6 pull-right">
                            <a className="btn btn-primary" onClick={askMembers}>Ask Mood from Members</a>
                        </div>
                    </div>
                </div>

                <div className="data-list pageContent background">
                    <h2 id="header2_2"> Members </h2>

                    {props.dashboard.children.map(child => {
                        var childMoodValue = (props.moods[child] ? props.moods[child].mood : 0);
                        var childMood = 20 * childMoodValue;
                        var childMoodImage = "/images/" + parseInt(childMoodValue) + ".png";
                        var childCssClass = moodCssClassForColor(childMood);
                        return (
                            <div key={child} className="data-list-item members">
                                <div>
                                    <h2>
                                        <Link to={'/users/' + child}>{child} <img className="dashboardMoodImg"
                                                                                  src={childMoodImage}
                                                                                  alt="mood"/>
                                        </Link>
                                    </h2>
                                </div>
                                <div>
                                    <ProgressBar now={childMood} bsStyle={childCssClass}/>
                                </div>
                            </div>
                        );

                    })}
                </div>
                <ul className="repos">


                </ul>
            </div>
        </div>
    );
}
