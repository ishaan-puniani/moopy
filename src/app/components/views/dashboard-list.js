import React from 'react';
import {Link} from 'react-router';
import {moodCssClassForColor} from '../../utils/utils';
import {ProgressBar} from 'react-bootstrap';

// Using "Stateless Functional Components"
export default function (props) {
    return (
        <div style={{
            width: "100%",
            overflow: "hidden"
        }}>
            {props.dashboards.map(dashboard => {
                var moodValue = (props.moods[dashboard.name] ? props.moods[dashboard.name].mood : 0), mood = 20 * moodValue;
                var moodImage = "/images/" + moodValue + ".png";
                var cssClass = moodCssClassForColor(mood);
                return (
                    <div className="col-md-4" key={dashboard.name}>
                        <div className="thumbnail">
                            <Link to={'/dashboards/' + dashboard.name}>
                                <h1 className="dashboardTitle">{dashboard.name}</h1>
                                <img src={moodImage} alt="mood" style={{width: "25%"}}/>
                            </Link>
                            <div className="caption">
                                <ProgressBar now={mood} bsStyle={cssClass}/>
                                <p>{props.moods[dashboard.name] ? props.moods[dashboard.name].mood : ""}</p>
                            </div>
                            <div className="controls">
                                <button onClick={props.subscribe.bind(null, dashboard.name)} className="delete">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
