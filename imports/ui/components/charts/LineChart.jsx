// Libs
import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';
import * as d3 from 'd3';
import * as _ from 'lodash';

// Components
import Line from './common/Line.jsx';
import Dots from './common/Dots.jsx';
import Grid from './common/Grid.jsx';
import Axis from './common/Axis.jsx';

// Line chart - Component displayed when line chart is selected
@observer(['countryStore', 'indicatorStore', 'recordStore', 'store'])
export default class LineChart extends Component {

    render() {

        const {countryStore, indicatorStore, recordStore, store} = {...this.props},
            margin = {top: 5, right: 50, bottom: 20, left: 50},
            width = store.width - margin.left - margin.right,
            height = store.height - margin.top - margin.bottom,
            countryIds = countryStore.countriesToDraw.map(c => c._id),
            indicatorIds = indicatorStore.indicatorsToDraw.map(c => c._id);

        if (_.size(countryIds) === 0 || _.size(indicatorIds) === 0) {
            return null;
        }

        let data = [];
        for (var i = 0; i < countryIds.length; i++) {
            for (var j = 0; j < indicatorIds.length; j++) {
                const d = _.filter(recordStore.recordsToDraw, r => r.countryId === countryIds[i] && r.indicatorId === indicatorIds[j]);
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
        for (var i = 0; i < data.length; i++) {
            let tempData = [];
            for (var j = 0; j < data[i].length; j++) {
                tempData.push(data[i][j]);
                if (!data[i][j + 1] || data[i][j + 1].year != data[i][j].year + 1) {
                    lines.push(
                        <Line
                            key={data[i][j].countryId + data[i][j].indicatorId + data[i][j].year}
                            d={line(tempData)}
                            stroke={data[i][j].countryColor}
                        />);
                    tempData = [];
                }
                dots.push(
                    <Dots
                        key={data[i][j].countryId + data[i][j].indicatorId + data[i][j].year}
                        data={tempData}
                        x={x}
                        y={y}
                        fill={data[i][j].countryColor}
                    />
                );
            }
        }

        const mainTransform = 'translate(' + margin.left + ',' + margin.top + ')';

        return (

            <svg
                className='line-chart'
                width={width + margin.left + margin.right}
                height={height + margin.top + margin.bottom}>

                <g transform={mainTransform}>

                    <Grid height={height} width={width} scale={x} gridType='vertical'/>
                    <Grid height={height} width={width} scale={y} gridType='horizontal'/>

                    <Axis data={data[0]} height={height} scale={y} axisType='y'/>
                    <Axis data={data[0]} height={height} scale={x} axisType='x' checkYears/>

                    {lines}
                    {dots}

                </g>

            </svg>

        )

    }

}