import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';

import BarChart from './BarChart.jsx';
import LineChart from './LineChart.jsx';
import RadarChart from './RadarChart.jsx';
import ScatterChart from './ScatterChart.jsx';

// ChartWrapper component - Decide which chart to show
@observer(['countryStore', 'indicatorStore', 'store'])
class ChartWrapper extends Component {

    constructor() {
        super();
        this._onResize = this._onResize.bind(this);
        this._chartResizeOnSideBarExpand = this._chartResizeOnSideBarExpand.bind(this);
    }

    componentWillMount() {
        this.props.store.chartResizeOnSideBarExpand = this._chartResizeOnSideBarExpand;
        window.addEventListener('resize', this._onResize);
    }

    componentDidMount() {
        this._onResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._onResize);
    }

    _onResize() {
        this.props.store.width = this.chart.clientWidth;
        // this.props.store.height = this.chartWrapper.clientHeight;
    }

    _chartResizeOnSideBarExpand(extra) {
        this.props.store.width = this.chart.clientWidth + extra;
        // this.props.store.height = this.chartWrapper.clientHeight;
    }

    render() {

        const props = this.props;

        let chart = '';

        if (props.store.barDraw) chart = <BarChart {...props}/>;
        else if (props.store.lineDraw) chart = <LineChart {...props}/>;
        else if (props.store.radarDraw) chart = <RadarChart {...props}/>;
        else if (props.store.scatterDraw) chart = <ScatterChart {...props}/>;

        return (

            <div className="chart-wrapper">
                <div className="chart" ref={(ref) => this.chart = ref}>{chart}</div>
            </div>

        )

    }

}

export default ChartWrapper;

ChartWrapper.wrappedComponent.propTypes = {
    countryStore: PropTypes.any.isRequired,
    indicatorStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired
};

ChartWrapper.wrappedComponent.defaultProps = {};