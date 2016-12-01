import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  return (
    <div className="data-list">

      {props.dashboards.map(dashboard => {

        return (
          <div key={dashboard.name} className="data-list-item">
            <div className="details">
              <Link to={'/dashboards/' + dashboard.name}>{dashboard.name}</Link></div>
            <div className="controls">
              <button onClick={props.subscribe.bind(null, dashboard.name)} className="delete">Delete</button>
            </div>
          </div>
        );
      })}

    </div>
  );
}
