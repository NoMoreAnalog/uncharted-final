// import React, {Component} from 'react';
// import {observer} from 'mobx-react';
// import {BarGroupChart} from 'react-d3-basic';
// import * as d3 from 'd3';
// import * as _ from 'lodash';
//
// Bar chart - Component displayed when bar chart is selected
// @observer(['countryStore', 'indicatorStore', 'recordStore', 'store'])
// class BarChart extends Component {
//
//     render() {
//
//         const {countryStore, indicatorStore, recordStore, store} = {...this.props},
//             countries = countryStore.activeCountries,
//             indicators = indicatorStore.activeIndicators,
//             countryIds = countries.map(c => c._id),
//             indicatorIds = indicators.map(c => c._id),
//             records = recordStore.getRecords(countryIds, indicatorIds),
//             yearData = _.groupBy(records, 'year');
//
//         let data = [],
//             chartSeries = {};
//
//         // data = [
//         //     {
//         //         'Year': '2000',
//         //         'Indicator 1': 10,
//         //         'Indicator 2': 11,
//         //         'Indicator 3': 15
//         //     },
//         //     {
//         //         'Year': '2001',
//         //         'Indicator 1': 5,
//         //         'Indicator 2': 12,
//         //         'Indicator 3': 15
//         //     }
//         // ]
//
//         // chartSeries = [
//         //     {field: 'Indicator 1', name: 'Indicator 1'},
//         //     {field: 'Indicator 2', name: 'Indicator 2'},
//         //     {field: 'Indicator 3', name: 'Indicator 3'}
//         //
//         // ]
//
//         if (countryIds.length === 1) {
//
//             _.forEach(_.keys(yearData), y => {
//                 let d = {};
//                 d.year = y;
//                 _.forEach(yearData[d.year], y => {
//                     d[y.indicatorName] = y.value;
//                 });
//                 data.push(d);
//             });
//
//             chartSeries = _.uniqWith(records.map(r => ({
//                 field: r.indicatorName,
//                 name: r.indicatorName
//             })), _.isEqual);
//
//         } else {
//
//             _.forEach(_.keys(yearData), y => {
//                 let d = {};
//                 d.year = y;
//                 _.forEach(yearData[d.year], y => {
//                     d[y.countryName] = y.value;
//                 });
//                 data.push(d);
//             });
//
//             chartSeries = _.uniqWith(records.map(r => ({
//                 field: r.countryName,
//                 name: r.countryName
//             })), _.isEqual);
//
//         }
//
//         const x = d => d.year,
//             xScale = 'ordinal',
//             xLabel = 'Countries',
//             yLabel = 'Value',
//             yLabelPosition = 'right',
//             yTickFormat = d3.format('.2s');
//
//         return (
//             <BarGroupChart
//                 margins={{top: 5, right: 50, bottom: 20, left: 50}}
//                 data={data}
//                 width={store.width}
//                 height={store.height}
//                 chartSeries={chartSeries}
//                 x={x}
//                 xScale={xScale}
//                 xLabel={xLabel}
//                 yTickFormat={yTickFormat}
//                 yLabelPosition={yLabelPosition}
//                 yLabel={yLabel}
//                 showLegend={false}
//             />
//         )
//
//     }
//
// }
//
// export default BarChart;

import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';
import * as d3 from 'd3';

import Bar from './common/Bar.jsx';
import Grid from './common/Grid.jsx';
import Axis from './common/Axis.jsx';

// Line chart - Component displayed when line chart is selected
@observer(['countryStore', 'indicatorStore', 'recordStore', 'store'])
class BarChart extends Component {

    render() {

        const {countryStore, indicatorStore, recordStore, store} = {...this.props};

        let countries = countryStore.activeCountries;
        let indicators = indicatorStore.activeIndicators;

        const countryIds = countries.map(c => c._id);

        const indicatorIds = indicators.map(c => c._id);

        const records = recordStore.getRecords(countryIds, indicatorIds);

        const data = records.map(r => ({year: r.year, value: r.value}));

        const margin = {top: 5, right: 50, bottom: 20, left: 50},
            w = store.width - (margin.left + margin.right),
            h = store.height - (margin.top + margin.bottom);

        const x = d3.scaleBand()
            .domain(data.map(d => d.year))
            .range([0, w])
            .padding(.5);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => Number.parseFloat(d.value))])
            .range([h, 0]);

        const bars = data.map((d, i) =>
            <Bar
                key={i}
                i={i}
                height={h - y(d.value)}
                width={w / data.length * .5}
                x={x(d.year)}
                y={y(d.value)}
            />
        );

        const mainTransform = 'translate(' + margin.left + ',' + margin.top + ')';
        const barsTransform = 'scale(1,-1) translate(0,-' + h + ')';

        return (

            <svg
                className="bar-chart"
                width={store.width}
                height={store.height}>

                <g transform={mainTransform}>

                    <Grid height={h} width={w} scale={y} gridType="y"/>

                    <g className="bars" transform={barsTransform}>
                        {bars}
                    </g>

                    <Axis data={data} height={h} scale={y} axisType="y"/>
                    <Axis data={data} height={h} scale={x} axisType="x"/>

                </g>

            </svg>

        )

    }

}

export default BarChart;

BarChart.wrappedComponent.propTypes = {
    countryStore: PropTypes.any.isRequired,
    indicatorStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number
};

BarChart.wrappedComponent.defaultProps = {};