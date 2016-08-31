import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

// Radar chart - Component displayed when radar chart is selected
const RadarChart = observer((props) =>

    <div className="radar-chart">Radar Chart Goes Here</div>

)

RadarChart.propTypes = {
    countryStore: PropTypes.any.isRequired,
    indicatorStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired
};

RadarChart.defaultProps = {};

export default RadarChart;