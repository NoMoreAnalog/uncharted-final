import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

// Scatter chart - Component displayed when scatter chart is selected
const ScatterChart = observer((props) =>

    <div className="scatter-chart">Scatter Chart Goes Here</div>

)

ScatterChart.propTypes = {
    countryStore: PropTypes.any.isRequired,
    indicatorStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired
};

ScatterChart.defaultProps = {};

export default ScatterChart;