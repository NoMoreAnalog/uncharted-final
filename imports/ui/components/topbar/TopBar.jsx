import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

// TopBar component - bar on top of page with chart options
const TopBar = observer((props) =>

    <div className="top-bar">

        <div className="fake-navigation"></div>

        <div className="chart-types">

            <div className="label">Available Graphs:</div>

            <button
                onClick={props.store.selectChart.bind(this, 'bar')}
                className={props.store.barAvailable ? 'chart-type available' : 'chart-type'}
            >
                <img src="bar.svg"/>Bar
            </button>

            <button
                onClick={props.store.selectChart.bind(this, 'line')}
                className={props.store.lineAvailable ? 'chart-type available' : 'chart-type'}
            >
                <img src="line.svg"/>Line
            </button>

            <button
                onClick={props.store.selectChart.bind(this, 'radar')}
                className={props.store.radarAvailable ? 'chart-type available' : 'chart-type'}
            >
                <img src="radar.svg"/>Radar
            </button>

            <button
                onClick={props.store.selectChart.bind(this, 'scatter')}
                className={props.store.scatterAvailable ? 'chart-type available' : 'chart-type'}
            >
                <img src="scatter.svg"/>Scatter
            </button>

        </div>

    </div>
)

TopBar.propTypes = {
    store: PropTypes.any.isRequired
};

TopBar.defaultProps = {};

export default TopBar;