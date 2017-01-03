import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

// Layouts
import MainLayout from './components/layouts/main-layout';
import SearchLayoutContainer from './components/containers/search-layout-container';

// Pages
import Home from './components/home';
import UserListContainer from './components/containers/user-list-container';
import UserProfileContainer from './components/containers/user-profile-container';

import WidgetListContainer from './components/containers/widget-list-container';
import DashBoardListContainer from './components/containers/dashboard-list-container';
import DashBoardContainer from './components/containers/dashboard-container';
import UpdateDashBoardContainer from './components/containers/dashboard-update-container';
import UserLoginContainer from './components/containers/userLogin-form-container';

export default (
    <Router history={browserHistory}>
        <Route component={MainLayout}>
            <Route path="/" component={Home}/>

            <Route path="users">
                <Route component={SearchLayoutContainer}>
                    <IndexRoute component={UserListContainer}/>
                </Route>
                <Route path=":userId" component={UserProfileContainer}/>
            </Route>

            <Route path="dashboards">
                <Route component={SearchLayoutContainer}>
                    <IndexRoute component={DashBoardListContainer}/>
                </Route>
                <Route path="create" component={UpdateDashBoardContainer}/>
                <Route path="/:name/edit" component={UpdateDashBoardContainer}/>
                <Route path=":name" component={DashBoardContainer}/>
            </Route>

            <Route path="widgets">
                <Route component={SearchLayoutContainer}>
                    <IndexRoute component={WidgetListContainer}/>
                </Route>
            </Route>

            <Route path="login" component={UserLoginContainer}/>
        </Route>
    </Router>
);
