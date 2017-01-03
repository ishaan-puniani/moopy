import React from 'react';

// Using "Stateless Functional Components"
export default function (props) {
    return (
        <div className="pageHeader background">
            <h1>{props.name}</h1>
        </div>
    );
}
