// Libs
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import * as d3 from 'd3';
import * as _ from 'lodash';

// Components
import Dots from './common/Dots.jsx';
import Grid from './common/Grid.jsx';
import Axis from './common/Axis.jsx';
import BigYear from './common/BigYear.jsx';
import NoChartsMessage from './NoChartsMessage.jsx';

// ScatterChart - Component displayed when scatter chart is selected
@observer(['countryStore', 'indicatorStore', 'recordStore', 'chartStore'])
export default class ScatterChart extends Component {

    render() {

        const {countryStore, indicatorStore, recordStore, chartStore} = {...this.props},
            margin = chartStore.margin,
            width = chartStore.width,
            height = chartStore.height,
            records = recordStore.recordsToDraw,
            countryIds = countryStore.countriesToDraw.map(c => c._id),
            indicatorIds = indicatorStore.indicatorsToDraw.map(i => i._id),
            indicatorNames = indicatorStore.indicatorsToDraw.map(i => i.name);

        if (_.size(records) === 0 || _.size(indicatorIds) !== 2 || _.size(countryIds) < 1) {
            return <NoChartsMessage noData/>;
        }

        let data0 = []; // This is the X indicator data
        for (var i = 0; i < countryIds.length; i++) {
            const d = _.filter(records, r => r.countryId === countryIds[i] && r.indicatorId === indicatorIds[0]);
            data0.push(d);
        }

        let data1 = []; // This is the Y indicator data
        for (var i = 0; i < countryIds.length; i++) {
            const d = _.filter(records, r => r.countryId === countryIds[i] && r.indicatorId === indicatorIds[1]);
            data1.push(d);
        }

        if (_.size(data0) === 0) data0 = data1;
        if (_.size(data1) === 0) data1 = data0;

        const x = d3.scaleLinear()
            .domain([
                d3.min(data0, (d, i) => d3.min(data0[i], d => d.value)),
                d3.max(data0, (d, i) => d3.max(data0[i], d => d.value))
            ])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([
                d3.min(data1, (d, i) => d3.min(data1[i], d => d.value)),
                d3.max(data1, (d, i) => d3.max(data1[i], d => d.value))
            ])
            .range([height, 0]);

        if (x.domain()[0] === x.domain()[1]) x.domain([x.domain()[0] * .9, x.domain()[0] * 1.1]);
        if (y.domain()[0] === y.domain()[1]) y.domain([y.domain()[0] * .9, y.domain()[0] * 1.1]);

        const dots = [];
        for (var i = 0; i < data1.length; i++) { // into arrays of country arrays

            let tempData = [];
            let d = {};

            for (let j = 0; j < data1[i].length; j++) { // into country array
                d = _.clone(data1[i][j]);
                if (data0[i] && data0[i][j] && d.countryId && d.indicatorId) {
                    d.year = data0[i][j].value;
                    tempData.push(d);
                }
            }

            if (_.size(tempData) === 0) continue;

            dots.push(
                <Dots
                    key={d.countryId + d.indicatorId}
                    data={tempData}
                    x={x}
                    y={y}
                    fill={d.originalColor}
                />
            );

        }

        if (_.size(dots) === 0) {
            return <NoChartsMessage noData/>;
        }

        const mainTransform = 'translate(' + margin.left + ',' + margin.top + ')';

        return (

            <svg
                id='svg-chart'
                className='scatter-chart'
                width={width + margin.left + margin.right}
                height={height + margin.top + margin.bottom}>

                <g transform={mainTransform}>

                    <Grid height={height} width={width} scale={x} gridType='vertical'/>
                    <Grid height={height} width={width} scale={y} gridType='horizontal'/>

                    <Axis height={height} width={width} margin={margin} scale={x} axisType='x' label={indicatorNames[0]}/>
                    <Axis height={height} width={width} margin={margin} scale={y} axisType='y' label={indicatorNames[1]}/>

                    {dots}

                    <BigYear x={width} y={height - 30} year={recordStore.yearsToDraw[1]}/>

                </g>

            </svg>

        )

    }

}