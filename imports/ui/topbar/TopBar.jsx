import React from 'react';

// TopBar component - bar on top of page with chart options
const TopBar = (props) => (
    <div className="top-bar">
        <div className="fake-navigation"></div>
        <div className="chart-types">
            <div>Available Graphs:</div>
            <div className="chart-type"><a href="#"><img src="bar.png"/>Bar Graph</a></div>
            <div className="chart-type"><a href="#"><img src="line.png"/>Line Graph</a></div>
            <div className="chart-type"><a href="#"><img src="radar.png"/>Radar</a></div>
            <div className="chart-type"><a href="#"><img src="scatter.png"/>Scatter Plot</a></div>
        </div>
    </div>
)

TopBar.propTypes = {};
TopBar.defaultProps = {};

export default TopBar;