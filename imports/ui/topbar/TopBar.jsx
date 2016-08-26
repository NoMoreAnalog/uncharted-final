import React from 'react';

// TopBar component - bar on top of page with chart options
const TopBar = (props) => (
    <div className="top-bar">
        <div className="fake-navigation"></div>
        <div className="chart-types">
            <ul>
                <li>Types of Graphs:</li>
                <li>Bar Graph</li>
                <li>Line Graph</li>
                <li>Radar</li>
                <li>Scatter Plot</li>
            </ul>
        </div>
    </div>
)

TopBar.propTypes = {};
TopBar.defaultProps = {};

export default TopBar;