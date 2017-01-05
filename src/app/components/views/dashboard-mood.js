import React from 'react';
import {Line} from 'react-chartjs-2';
// for today https://github.com/chartjs/Chart.js/issues/2401
// gor week
// Using "Stateless Functional Components"
export default function (props) {
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


    var getChart = function (props) {

            if (props.moods && props.moods.length > 0) {

                var name = props.label;

                var da = props.moods;
                var dataset = da.map(function (d) {
                    var r = (Math.floor(Math.random() * 256)), g = (Math.floor(Math.random() * 256)), b = (Math.floor(Math.random() * 256));

                    var color = 'rgb(' + r + ',' + g + ',' + b + ')';
                    var fill = 'rgba(' + r + ',' + g + ',' + b + ',0.4)';

                    var values = [];
                    if (d.moods) {
                        d.moods.forEach(function (mood) {
                            values.push({x: mood.createdAt, y: mood.mood});
                        });
                    }


                    return {
                        label: d.name,
                        data: values,//[1, 5],
                        tension: 0,
                        borderColor: color,
                        backgroundColor: fill,
                        radius: 0,
                        pointHitRadius: 5,
                    }

                });
                console.log(dataset);
                if (dataset.length == 0) {
                    dataset = [{
                        label: "",
                        data: [],//[1, 5],
                        tension: 0,
                        borderColor: 'rgb(255,255,255)',
                        backgroundColor: 'rgb(255,255,255)',
                        radius: 0,
                        pointHitRadius: 5,
                    }];
                }
                var data = {
                    //labels: nameLabels,//[new Date(), new Date(new Date().getTime() + 24 * 60 * 60 * 1000)],
                    datasets: dataset
                };

                var options = {
                    animation: false,
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

                return (            <Line data={data}
                                          options={options}
                />)
            } else {
                return (<div></div>);
            }
        }
        ;
    return (
        <div className="pageContent user-moods background">
            Please choose time <select onChange={rangeChanged}>
            <option value={-1}>-- Select --</option>
            <option value={0}>Today</option>
            <option value={1}>This Week</option>
            <option value={2}>This Month</option>
            <option value={3}>This Quater</option>
            <option value={4}>This Year</option>
            <option value={5}>All</option>
        </select>
            <div style={{"minHeight": "500px"}}>
                {getChart(props)}
            </div>
        </div>
    );
}
