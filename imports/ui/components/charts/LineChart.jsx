import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

// Line chart - Component displayed when line chart is selected
const LineChart = observer((props) =>

    <div className="line-chart">Line Chart Goes Here</div>

)

LineChart.propTypes = {
    countryStore: PropTypes.any.isRequired,
    indicatorStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired
};

LineChart.defaultProps = {};

export default LineChart;