import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';

import BarChart from './BarChart.jsx';
import LineChart from './LineChart.jsx';
import RadarChart from './RadarChart.jsx';
import ScatterChart from './ScatterChart.jsx';
import Legend from './legend/Legend.jsx';

// ChartWrapper component - Decide which chart to show
@observer(['countryStore', 'indicatorStore', 'store'])
class ChartWrapper extends Component {

    constructor() {
        super();
        this._updateSize = this._updateSize.bind(this);
    }

    componentWillMount() {
        this.props.store.resizeChartSVGOnChartAreaResize = this._updateSize;
        window.addEventListener('resize', this._updateSize);    }

    componentDidMount() {
        this._updateSize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize);
    }

    _updateSize(extra = 0) {
        this.props.store.width = this.chartWrapper.clientWidth + extra;
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

            <div className="chart-wrapper" ref={(ref) => this.chartWrapper = ref}>

                <div className="chart">
                    {chart}
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

    }

}

export default ChartWrapper;

ChartWrapper.wrappedComponent.propTypes = {
    countryStore: PropTypes.any.isRequired,
    indicatorStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number
};

ChartWrapper.wrappedComponent.defaultProps = {
    width: 800,
    height: 300
};