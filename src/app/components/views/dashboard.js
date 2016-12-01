import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function (props) {
    return (
        <div className="dashboard-details">
            <div className="details">
                <h1>{props.name}</h1>
                <h3>Individuals:</h3>
                <Link to={'/' + props.name + '/edit'}>EDIT</Link>
                <ul className="repos">

                    {props.children.map(child => {

                        return (<li key={child}><a>{child}</a></li>);

                    })}

                </ul>
            </div>
        </div>
    );
}
