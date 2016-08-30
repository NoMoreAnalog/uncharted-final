import React from 'react';
import {observer} from 'mobx-react';

// Chart component - Decide which chart to show
const Chart = observer((props) =>

    <div className="chart">Chart goes here</div>

)

Chart.propTypes = {};
Chart.defaultProps = {};

export default Chart;