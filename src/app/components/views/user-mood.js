import React from 'react';
import {Line} from 'react-chartjs-2';
// for today https://github.com/chartjs/Chart.js/issues/2401
// gor week
// Using "Stateless Functional Components"
export default function (props) {
    var name = props.label;
    console.log(props.selected);
    var xAxes = props.selected == "0" ? [{
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
        }] : [{
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
        }];
    var rangeChanged = function (ths) {
        debugger;
        var start = "", end = "";
        var selectedValue = ths.target.value;
        if (selectedValue === "0") {
            props.onDateRangeChanges(start, end, 1, selectedValue);

        }
        if (selectedValue === "1") {
            props.onDateRangeChanges(start, end, 7, selectedValue);

        }
        if (selectedValue === "2") {
            props.onDateRangeChanges(start, end, 30, selectedValue)
        }
        if (selectedValue === "3") {
            props.onDateRangeChanges(start, end, 90, selectedValue)
        }
        if (selectedValue === "4") {
            props.onDateRangeChanges(start, end, 365, selectedValue)
        }
        if (selectedValue === "5") {
            props.onDateRangeChanges(start, end, 3650, selectedValue)
        }

        if (selectedValue === "-1") {
            //   props.onDateRangeChanges(start, end,7)
        }

    };
    var label = [], values = [];
    if (props.moods) {
        props.moods.forEach(function (mood) {
            label.push(mood.createdAt);
            values.push(mood.mood);
        });
    }

    var data = {
        labels: label,//[new Date(), new Date(new Date().getTime() + 24 * 60 * 60 * 1000)],
        datasets: [
            {
                label: name,
                data: values,//[1, 5],
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
            text: name
        },
        scales: {
            /* for today : */
            xAxes: xAxes,

            yAxes: [{
                position: "left",
                ticks: {
                    max: 6,
                    min: 0
                }
            }]
        }
    };
    console.log(options);

    return (
        <div className="pageContent user-moods background">
            <select onChange={rangeChanged}>
                <option value={-1}>-- Select --</option>
                <option value={0}>Today</option>
                <option value={1}>This Week</option>
                <option value={2}>This Month</option>
                <option value={3}>This Quater</option>
                <option value={4}>This Year</option>
                <option value={5}>All</option>
            </select>
            <div>
                <Line data={data}
                      options={options}
                />
            </div>
        </div>
    );
}
