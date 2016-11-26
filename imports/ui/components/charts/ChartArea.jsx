import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

import ChartWrapper from './ChartWrapper.jsx';
import Menu from './Menu.jsx';
import YearSlider from './YearSlider.jsx';
import Legends from './legend/Legends.jsx';

// ChartArea component - Area for chart and chart information
const ChartArea = observer(['countryStore', 'indicatorStore', 'store'], (props) =>

    <div className="chart-area">

        <h1 className="ui header title">
            <div className="content">
                {props.store.chartTitle}
                <hr/>
            </div>
        </h1>

        <div className="stage">
            <Menu/>
            <ChartWrapper />
            <YearSlider/>
            <Legends />
        </div>

    </div>
)

export default ChartArea;

ChartArea.wrappedComponent.propTypes = {
    countryStore: PropTypes.any.isRequired,
    indicatorStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired
};

ChartArea.wrappedComponent.defaultProps = {};