import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function (props) {
    return (
        <div className="dashboard-details">
            <div className="details">
                <h1>{props.dashboard.name}</h1>
                <h3>Individuals:</h3>
                <Link to={'/' + props.dashboard.name + '/edit'}>EDIT</Link>
                <ul className="repos">

                    {props.dashboard.children.map(child => {

                        return (
                            <li key={child}>
                                <a>{child}</a>
                                -{props.moods[child]?props.moods[child].mood:""}
                            </li>);

                    })}

                </ul>
            </div>
        </div>
    );
}
