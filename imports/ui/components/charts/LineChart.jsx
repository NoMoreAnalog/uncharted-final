// Libs
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import * as d3 from 'd3';
import * as _ from 'lodash';

// Components
import Line from './common/Line.jsx';
import Dots from './common/Dots.jsx';
import Grid from './common/Grid.jsx';
import Axis from './common/Axis.jsx';

// Line chart - Component displayed when line chart is selected
@observer(['countryStore', 'indicatorStore', 'recordStore', 'chartStore'])
export default class LineChart extends Component {

    render() {

        const {countryStore, indicatorStore, recordStore, chartStore} = {...this.props},
            margin = {top: 5, right: 35, bottom: 20, left: 50},
            width = chartStore.width - margin.left - margin.right,
            height = chartStore.height - margin.top - margin.bottom,
            records = recordStore.recordsToDraw,
            countryIds = countryStore.countriesToDraw.map(c => c._id),
            indicatorIds = indicatorStore.indicatorsToDraw.map(c => c._id);

        if (_.size(records) === 0) {
            return null;
        }

        let data = [];
        for (let i = 0; i < countryIds.length; i++) {
            for (var j = 0; j < indicatorIds.length; j++) {
                const d = _.filter(records, r => r.countryId === countryIds[i] && r.indicatorId === indicatorIds[j]);
                data.push(d);
            }
        }

        const x = d3.scaleLinear()
            .domain([
                d3.min(data, (d, i) => d3.min(data[i], d => d.year)),
                d3.max(data, (d, i) => d3.max(data[i], d => d.year))
            ])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, (d, i) => d3.max(data[i], d => d.value))])
            .range([height, 0]);

        const line = d3.line()
            .x(d => x(d.year))
            .y(d => y(d.value))
            .curve(d3.curveLinear);

        const lines = [],
            dots = [];
        for (let i = 0; i < data.length; i++) { // into arrays of line arrays

            let tempData = [];

            for (let j = 0; j < data[i].length; j++) { // into line arrays

                tempData.push(data[i][j]);

                if (!data[i][j + 1] || data[i][j + 1].year != data[i][j].year + 1) {
                    lines.push(
                        <Line
                            key={data[i][j].countryId + data[i][j].indicatorId + '---' + j}
                            d={line(tempData)}
                            stroke={data[i][j].countryColor}
                        />);

                    dots.push(
                        <Dots
                            key={data[i][j].countryId + data[i][j].indicatorId + '---' + j}
                            data={tempData}
                            x={x}
                            y={y}
                            fill={data[i][j].countryColor}
                        />
                    );

                    tempData = [];

                }

            }

        }

        const mainTransform = 'translate(' + margin.left + ',' + margin.top + ')';

        return (

            <svg
                id='svg-chart'
                className='line-chart'
                width={width + margin.left + margin.right}
                height={height + margin.top + margin.bottom}>

                <g transform={mainTransform}>

                    <Grid height={height} width={width} scale={x} gridType='vertical' checkYears/>
                    <Grid height={height} width={width} scale={y} gridType='horizontal'/>

                    <Axis data={data[0]} height={height} scale={x} axisType='x' checkYears/>
                    <Axis data={data[0]} height={height} scale={y} axisType='y'/>

                    {lines}
                    {dots}

                </g>

            </svg>

        )

    }

}