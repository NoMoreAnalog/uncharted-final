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
        this.props.store.width = this.chartWrapper.clientWidth;
        // this.props.store.height = this.chartWrapper.clientHeight;
    }

    _chartResizeOnSideBarExpand(extra) {
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
    store: PropTypes.any.isRequired
};

ChartWrapper.wrappedComponent.defaultProps = {};