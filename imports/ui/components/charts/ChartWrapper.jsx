import React, {Component} from 'react';
import {observer} from 'mobx-react';

import BarChart from './BarChart.jsx';
import LineChart from './LineChart.jsx';
import RadarChart from './RadarChart.jsx';
import ScatterChart from './ScatterChart.jsx';

// ChartWrapper component - Decide which chart to show
@observer(['countryStore', 'indicatorStore', 'chartStore'])
export default class ChartWrapper extends Component {

    constructor() {
        super();

        this._onResize = this._onResize.bind(this);
        this._chartResizeOnSideBarExpand = this._chartResizeOnSideBarExpand.bind(this);
    }

    componentWillMount() {
        const {chartStore} = {...this.props};
        chartStore.chartResizeOnSideBarExpand = this._chartResizeOnSideBarExpand;
        window.addEventListener('resize', this._onResize);
    }

    componentDidMount() {
        this._onResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._onResize);
    }

    _onResize() {
        const {chartStore} = {...this.props};
        chartStore.width = this.chart.clientWidth - chartStore.margin.left - chartStore.margin.right;
    }

    _chartResizeOnSideBarExpand(extra) {
        const {chartStore} = {...this.props};
        chartStore.width = this.chart.clientWidth - chartStore.margin.left - chartStore.margin.right + extra;
    }

    render() {

        const {chartStore} = {...this.props};

        let chart = '';

        if (chartStore.barDraw) chart = <BarChart {...this.props}/>;
        else if (chartStore.lineDraw) chart = <LineChart {...this.props}/>;
        else if (chartStore.radarDraw) chart = <RadarChart {...this.props}/>;
        else if (chartStore.scatterDraw) chart = <ScatterChart {...this.props}/>;

        return (
            <div className="chart-wrapper">
                <div className="chart" ref={(ref) => this.chart = ref}>{chart}</div>
            </div>
        )

    }

}