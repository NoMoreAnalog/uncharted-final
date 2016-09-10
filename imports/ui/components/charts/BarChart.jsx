import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';
import * as d3 from 'd3';

import Bar from './common/Bar.jsx';
import Grid from './common/Grid.jsx';
import Axis from './common/Axis.jsx';

// Line chart - Component displayed when line chart is selected
@observer(['countryStore', 'indicatorStore', 'store'])
class BarChart extends Component {

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

        const x = d3.scaleBand()
            .domain(data.map(d => d.year))
            .range([0, w])
            .padding(.5);

        var y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
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