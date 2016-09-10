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
            {year: '2000', value: .5},
            {year: '2001', value: .15},
            {year: '2002', value: .5},
            {year: '2003', value: .25},
            {year: '2004', value: .5},
            {year: '2005', value: .4},
            {year: '2006', value: .8},
            {year: '2007', value: .4}
        ];

        const margin = {top: 5, right: 50, bottom: 20, left: 50},
            w = store.width - (margin.left + margin.right),
            h = store.height - (margin.top + margin.bottom);

        const parseDate = d3.timeParse("%Y");

        data.forEach(d => {
            d.date = parseDate(d.year);
        });

        const x = d3.scaleTime()
            .domain(d3.extent(data, d => d.date))
            .range([0, w]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
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