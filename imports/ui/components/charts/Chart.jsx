import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

import BarChart from './BarChart.jsx';
import LineChart from './LineChart.jsx';
import RadarChart from './RadarChart.jsx';
import ScatterChart from './ScatterChart.jsx';

// Chart component - Decide which chart to show
const Chart = observer((props) =>

    <div className="chart">
        {props.store.barShowing ? <BarChart {...props}/> :
            props.store.lineShowing ? <LineChart {...props}/> :
                props.store.radarShowing ? <RadarChart {...props}/> :
                    props.store.scatterShowing ? <ScatterChart {...props}/> : ''}
    </div>

)

Chart.propTypes = {
    countryStore: PropTypes.any.isRequired,
    indicatorStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired
};

Chart.defaultProps = {};

export default Chart;