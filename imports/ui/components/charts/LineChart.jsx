import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';
import * as d3 from 'd3';

import Line from './common/Line.jsx';
import Dots from './common/Dots.jsx';
import Grid from './common/Grid.jsx';
import Axis from './common/Axis.jsx';

// Line chart - Component displayed when line chart is selected
@observer(['countryStore', 'indicatorStore', 'store'])
class LineChart extends Component {

    render() {

        const {countryStore, indicatorStore, store} = {...this.props};

        var data = [
            {day: '02-11-2016', count: 180},
            {day: '02-12-2016', count: 250},
            {day: '02-13-2016', count: 150},
            {day: '02-14-2016', count: 496},
            {day: '02-15-2016', count: 140},
            {day: '02-16-2016', count: 380},
            {day: '02-17-2016', count: 100},
            {day: '02-18-2016', count: 150}
        ];

        const margin = {top: 5, right: 50, bottom: 20, left: 50},
            w = store.width - (margin.left + margin.right),
            h = store.height - (margin.top + margin.bottom);

        const parseDate = d3.timeParse("%m-%d-%Y");

        data.forEach(d => {
            d.date = parseDate(d.day);
        });

        const x = d3.scaleTime()
            .domain(d3.extent(data, d => d.date))
            .range([0, w]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count + 100)])
            .range([h, 0]);

        const transform = 'translate(' + margin.left + ',' + margin.top + ')';

        return (

            <svg
                className="line-chart"
                width={store.width}
                height={store.height}>

                <g transform={transform}>

                    <Grid height={h} width={w} scale={y} gridType="y"/>

                    <Axis data={data} height={h} scale={y} axisType="y"/>
                    <Axis data={data} height={h} scale={x} axisType="x"/>

                    <Line data={data} x={x} y={y}/>
                    <Dots data={data} x={x} y={y}/>

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