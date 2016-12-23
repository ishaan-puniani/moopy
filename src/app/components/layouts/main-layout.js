import React from 'react';
import {Link} from 'react-router';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import SynchronizerContainer from '../containers/serverSynchronizer-container'

// Using "Stateless Functional Components"
export default function (props) {
    return (
        <div className="">
            <SynchronizerContainer />
            <header className="primary-header">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/" activeClassName="active"><img src="/images/logo.png" style={{width: "120px"}}/></Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <ul className="nav navbar-nav">
                        <li><Link to="/" activeClassName="active">Home</Link></li>
                        <li><Link to="/users" activeClassName="active">Users</Link></li>
                        <li><Link to="/widgets" activeClassName="active">Widgets</Link></li>
                        <li><Link to="/dashboards" activeClassName="active">Dashboards</Link></li>
                    </ul>
                </Navbar>
            </header>
            <main className="container">
                {props.children}
            </main>
        </div>
    );
}
