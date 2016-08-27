import React from 'react';

// TopBar component - bar on top of page with chart options
const TopBar = (props) => (
    <div className="top-bar">
        <div className="fake-navigation"></div>
        <div className="chart-types">
            <div className="label">Available Graphs:</div>
            <div className="chart-type"><img src="bar.svg"/>Bar Graph</div>
            <div className="chart-type"><img src="line.svg"/>Line Graph</div>
            <div className="chart-type"><img src="radar.svg"/>Radar</div>
            <div className="chart-type"><img src="scatter.svg"/>Scatter Plot</div>
        </div>
    </div>
)

TopBar.propTypes = {};
TopBar.defaultProps = {};

export default TopBar;