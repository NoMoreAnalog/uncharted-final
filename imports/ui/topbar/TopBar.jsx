import React from 'react';

// TopBar component - bar on top of page with chart options
const TopBar = (props) => (
    <div className="top-bar">
        <div className="fake-navigation"></div>
        <div className="chart-types">
            <div className="label">Available Graphs:</div>
            <div className="chart-type"><a href="#"><img src="bar.svg"/>Bar Graph</a></div>
            <div className="chart-type"><a href="#"><img src="line.svg"/>Line Graph</a></div>
            <div className="chart-type"><a href="#"><img src="radar.svg"/>Radar</a></div>
            <div className="chart-type"><a href="#"><img src="scatter.svg"/>Scatter Plot</a></div>
        </div>
    </div>
)

TopBar.propTypes = {};
TopBar.defaultProps = {};

export default TopBar;