import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

import BarChart from './BarChart.jsx';
import LineChart from './LineChart.jsx';
import RadarChart from './RadarChart.jsx';
import ScatterChart from './ScatterChart.jsx';
import Legend from './Legend.jsx';

// ChartWrapper component - Decide which chart to show
const ChartWrapper = observer(['countryStore', 'indicatorStore', 'store'], (props) =>

    <div className="chart-wrapper">

        <div className="chart">
            {props.store.barShowing ? <BarChart {...props}/> :
                props.store.lineShowing ? <LineChart {...props}/> :
                    props.store.radarShowing ? <RadarChart {...props}/> :
                        props.store.scatterShowing ? <ScatterChart {...props}/> : ''}
        </div>

        <div className="ui two column grid legends">

            <div className="column">

                <Legend
                    title={'Country:'}
                    list={props.countryStore.activeCountries}
                    classed="countries"
                    itemStore={props.countryStore}
                    store={props.store}
                />

            </div>

            <div className="column">

                <Legend
                    title={'Indicator:'}
                    list={props.indicatorStore.activeIndicators}
                    classed="indicators"
                    itemStore={props.indicatorStore}
                    store={props.store}
                />

            </div>

        </div>

    </div>
)

ChartWrapper.wrappedComponent.propTypes = {
    countryStore: PropTypes.any.isRequired,
    indicatorStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired
};

ChartWrapper.wrappedComponent.defaultProps = {};

export default ChartWrapper;