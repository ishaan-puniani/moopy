import React from 'react';
import {Link} from 'react-router';
import {HorizontalBar} from 'react-chartjs-2';
import { browserHistory } from 'react-router'

// Using "Stateless Functional Components"
export default function (props) {
    var names = [], moods = [];
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
    }
    return (
        <div className="dashboard-details">
            <div className="details">
                <h1>{props.dashboard.name}</h1>
                <div className="dashboardAvgChart">

                    <HorizontalBar data={dataOfDashboard}
                                   width={10}
                                   height={20}
                                   options={option}
                    />
                </div>
                <h3>Individuals:</h3>
                <Link to={'/' + props.dashboard.name + '/edit'}>EDIT</Link>
                <div className="dashboardChildrenChart" style={childrenChartStyle}>
                    <HorizontalBar data={dataOfChildren}
                                   width={100}
                                   height={height}
                                   options={option}
                                   onElementsClick={elementClick}/>
                </div>
                <ul className="repos">

                    {props.dashboard.children.map(child => {

                        return (
                            <li key={child}>
                                <a>{child}</a>
                                -{props.moods[child] ? props.moods[child].mood : ""}
                            </li>);

                    })}

                </ul>
            </div>
        </div>
    );
}
