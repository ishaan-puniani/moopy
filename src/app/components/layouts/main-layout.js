import React from 'react';
import {Link} from 'react-router';
import { Navbar, Nav, NavItem  } from 'react-bootstrap';
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
                            <a href="/">Moopy</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} href="/">Link</NavItem>
                        <NavItem eventKey={2} href="/users">Users</NavItem>
                    </Nav>
                    <ul className="nav navbar-nav">
                        <li><Link to="/" activeClassName="active">Home</Link></li>
                        <li><Link to="/users" activeClassName="active">Users</Link></li>
                        <li><Link to="/widgets" activeClassName="active">Widgets</Link></li>
                        <li><Link to="/dashboards" activeClassName="active">Dashboards</Link></li>
                    </ul>
                </Navbar>


                {/*       <ul>
                 <li><Link to="/" activeClassName="active">Home</Link></li>
                 <li><Link to="/users" activeClassName="active">Users</Link></li>
                 <li><Link to="/widgets" activeClassName="active">Widgets</Link></li>
                 <li><Link to="/dashboards" activeClassName="active">Dashboards</Link></li>
                 </ul>*/}
            </header>
           {/* <aside className="primary-aside">
                <ul>
                    <li><Link to="/" activeClassName="active">Home</Link></li>
                    <li><Link to="/users" activeClassName="active">Users</Link></li>
                    <li><Link to="/widgets" activeClassName="active">Widgets</Link></li>
                    <li><Link to="/dashboards" activeClassName="active">Dashboards</Link></li>
                </ul>
            </aside>*/}
            <main>
                {props.children}
            </main>
        </div>
    );
}
