import React from 'react';

import Login from './containers/userLogin-form-container'


const Home = React.createClass({
    render: function () {
        return (
            <div className="home-page pageContent background">
                <h1>Moopy</h1>
                <br/>
                <br/>
                <h2>Download for</h2>
                <p>
                    <a href="./images/Moopy Setup 1.0.0.exe">
                        <img width="50" height="50" src="./images/win.png"/> Windows
                    </a>
                    <a href="./images/Moopy-1.0.0.dmg">
                        <img width="50" height="50" src="./images/mac.png"/> Mac
                    </a>
                </p>
            </div>
        );
    }
});

export default Home;
