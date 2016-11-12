// Libs
import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';
import * as d3 from 'd3';

// Components
import Line from './common/Line.jsx';
import Dots from './common/Dots.jsx';
import Grid from './common/Grid.jsx';
import Axis from './common/Axis.jsx';

// Line chart - Component displayed when line chart is selected
@observer(['countryStore', 'indicatorStore', 'recordStore', 'store'])
class LineChart extends Component {

    render() {

        const {countryStore, indicatorStore, recordStore, store} = {...this.props};

        const margin = {top: 5, right: 50, bottom: 20, left: 50};
        const w = store.width - (margin.left + margin.right);
        const h = store.height - (margin.top + margin.bottom);

        const countries = countryStore.activeCountries;
        const indicators = indicatorStore.activeIndicators;
        const countryIds = countries.map(c => c._id);
        const indicatorIds = indicators.map(c => c._id);

        let data = [];
        for (var i = 0; i < countryIds.length; i++) {
            for (var j = 0; j < indicatorIds.length; j++) {
                const records = recordStore.getRecords([countryIds[i]], [indicatorIds[j]]);
                data.push(records.map(r => ({
                    year: r.year,
                    value: r.value,
                    country: r.countryName,
                    indicator: r.indicatorName
                })));
            }
        }

        const x = d3.scaleLinear()
            .domain([
                d3.min(data, (d, i) => d3.min(data[i], d => d.year)),
                d3.max(data, (d, i) => d3.max(data[i], d => d.year))
            ])
            .range([0, w]);
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, (d, i) => d3.max(data[i], d => d.value))])
            .range([h, 0]);

        const line = d3.line()
            .x(d => x(d.year))
            .y(d => y(d.value))
            .curve(d3.curveCardinal.tension(0));

        const lines = [];
        const dots = [];
        for (var i = 0; i < data.length; i++) {
            let tempData = [];
            for (var j = 0; j < data[i].length; j++) {
                tempData.push(data[i][j]);
                if (!data[i][j + 1] || data[i][j + 1].year != data[i][j].year + 1) {
                    lines.push(<Line key={i + '' + j} d={line(tempData)}/>);
                    tempData = [];
                }
            }
            dots.push(<Dots key={i} data={data[i]} x={x} y={y}/>);
        }

        return (

            <svg
                className="line-chart"
                width={store.width}
                height={store.height}>

                <g transform={'translate(' + margin.left + ',' + margin.top + ')'}>

                    <Grid height={h} width={w} scale={y} gridType="y"/>

                    <Axis data={data[0]} height={h} scale={y} axisType="y"/>
                    <Axis data={data[0]} height={h} scale={x} axisType="x"/>

                    {lines}
                    {dots}

                </g>

            </svg>

        )

    }

}

LineChart.wrappedComponent.propTypes = {
    countryStore: PropTypes.any.isRequired,
    indicatorStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number
};

LineChart.wrappedComponent.defaultProps = {};

export default LineChart;