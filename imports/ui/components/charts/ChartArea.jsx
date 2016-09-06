import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

import Chart from './Chart.jsx';
import Legend from './Legend.jsx';

// Chart component - Area for chart and chart information
const ChartArea = observer(['countryStore', 'indicatorStore', 'store'], (props) =>

    <div className="chart-area">

        <div className="text-wrapper">
            <div className="title">{props.store.chartTitle}</div>
            <hr className="horizontal-line"/>
            <div className="subtitle">Choose your Countries and Indicators</div>
        </div>

        <Chart {...props}/>

        <Legend
            title={'Country:'}
            list={props.countryStore.activeCountries}
            classed="countries"
            itemStore={props.countryStore}
            store={props.store}
        />

        <Legend
            title={'Indicator:'}
            list={props.indicatorStore.activeIndicators}
            classed="indicators"
            itemStore={props.indicatorStore}
            store={props.store}
        />

    </div>
)

export default ChartArea;

ChartArea.wrappedComponent.propTypes = {
    countryStore: PropTypes.any.isRequired,
    indicatorStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired
};

ChartArea.wrappedComponent.defaultProps = {};