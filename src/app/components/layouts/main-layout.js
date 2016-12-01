import React from 'react';
import {Link} from 'react-router';

// Using "Stateless Functional Components"
export default function (props) {
    return (
        <div className="app">
            <header className="primary-header">
                {/*       <ul>
                 <li><Link to="/" activeClassName="active">Home</Link></li>
                 <li><Link to="/users" activeClassName="active">Users</Link></li>
                 <li><Link to="/widgets" activeClassName="active">Widgets</Link></li>
                 <li><Link to="/dashboards" activeClassName="active">Dashboards</Link></li>
                 </ul>*/}
            </header>
            <aside className="primary-aside">
                <ul>
                    <li><Link to="/" activeClassName="active">Home</Link></li>
                    <li><Link to="/users" activeClassName="active">Users</Link></li>
                    <li><Link to="/widgets" activeClassName="active">Widgets</Link></li>
                    <li><Link to="/dashboards" activeClassName="active">Dashboards</Link></li>
                </ul>
            </aside>
            <main>
                {props.children}
            </main>
        </div>
    );
}
