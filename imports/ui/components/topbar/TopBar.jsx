import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

// TopBar component - bar on top of page with chart options
const TopBar = observer((props) =>

    <div className="top-bar">

        <div className="fake-navigation"></div>

        <div className="chart-types">
            <div className="label">Available Graphs:</div>
            <div className="chart-type"><img src="bar.svg"/>Bar</div>
            <div className="chart-type"><img src="line.svg"/>Line</div>
            <div className="chart-type"><img src="radar.svg"/>Radar</div>
            <div className="chart-type"><img src="scatter.svg"/>Scatter</div>
        </div>

    </div>

)

TopBar.propTypes = {
    store: PropTypes.any.isRequired
};

TopBar.defaultProps = {};

export default TopBar;