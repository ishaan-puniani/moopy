import React from 'react';
import {Line} from 'react-chartjs-2';
// for today https://github.com/chartjs/Chart.js/issues/2401
// gor week
// Using "Stateless Functional Components"
export default function (props) {
    alert(props.moods);
    var rangeChanged = function (ths) {
        debugger;
        var selectedValue = ths.target.value;
        if (selectedValue === 0) {

        }

        props.onDateRangeChanges("xxx", "yyy")
    };


    var data = {
        labels: [new Date(), new Date(new Date().getTime() + 24 * 60 * 60 * 1000)],
        datasets: [
            {
                label: "Aktiv",
                data: [1, 5],
                tension: 0,
                borderColor: "rgb(248,169,113)",
                backgroundColor: "rgba(248,169,113,0.4)",
                radius: 0,
                pointHitRadius: 5,
            }]
    };

    var options = {
        stacked: true,
        title: {
            display: true,
            text: "testMain Label"
        },
        scales: {
           /* for today : xAxes: [{
                type: 'time',
                time: {
                    format: "HH:mm",
                    unit: 'hour',
                    unitStepSize: 4,
                    displayFormats: {
                        'minute': 'HH:mm',
                        'hour': 'HH:mm'
                    }
                }
            }]*/
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day',
                    unitStepSize: 1,
                    displayFormats: {
                        'millisecond': 'MMM DD',
                        'second': 'MMM DD',
                        'minute': 'MMM DD',
                        'hour': 'MMM DD',
                        'day': 'MMM DD',
                        'week': 'MMM DD',
                        'month': 'MMM DD',
                        'quarter': 'MMM DD',
                        'year': 'MMM DD',
                    }
                }
            }],
            yAxes: [{
                position: "left"
            }]
        }
    };


    return (
        <div className="user-moods">
            <select onChange={rangeChanged}>
                <option value={0}>Today</option>
                <option value={1}>This Week</option>
                <option value={2}>This Month</option>
                <option value={3}>This Quater</option>
                <option value={4}>This Year</option>
                <option value={5}>All</option>
            </select>
            <div style={{width: "500px", height: "300px"}}>
                <Line data={data}
                      width={10}
                      height={20}
                      options={options}
                />
            </div>
        </div>
    );
}
