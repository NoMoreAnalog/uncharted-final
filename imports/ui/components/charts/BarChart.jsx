import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

// Bar chart - Component displayed when bar chart is selected
const BarChart = observer((props) =>

    <div className="bar-chart">Bar Chart Goes Here</div>

)

BarChart.propTypes = {
    countryStore: PropTypes.any.isRequired,
    indicatorStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired
};

BarChart.defaultProps = {};

export default BarChart;