// Libs
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Popup, List, Divider} from 'semantic-ui-react';
import * as d3 from 'd3';
import * as _ from 'lodash';

// RadarChart - Component displayed when radar chart is selected
@observer(['countryStore', 'indicatorStore', 'recordStore', 'chartStore'])
export default class RadarChart extends Component {

    render() {

        const {countryStore, indicatorStore, recordStore, chartStore} = {...this.props},
            margin = chartStore.margin,
            width = chartStore.height, // needs to be square
            height = chartStore.height,
            records = recordStore.recordsToDraw,
            countries = countryStore.countriesToDraw.map(c => ({'_id': c._id, 'name': c.name})),
            indicators = indicatorStore.indicatorsToDraw.map(i => ({'_id': i._id, 'name': i.name}));

        if (_.size(records) === 0) {
            return null;
        }

        const levels = 6,
            factor = 1,
            radians = 2 * Math.PI,
            factorLegend = .85,
            opacityArea = 0.5,
            maxValue = d3.max(records, r => r.value),
            radius = factor * Math.min(width / 2, height / 2);

        let allAxes = [],
            allSeries = [],
            seriesId = '';

        if (_.size(indicators) >= 3) {
            allAxes = indicators;
            allSeries = countries;
            seriesId = 'countryId';
        } else {
            allAxes = countries;
            allSeries = indicators;
            seriesId = 'indicatorId';
        }

        const totalAxes = _.size(allAxes),
            totalSeries = _.size(allSeries);

        //Circular segments
        const levelCircles = [];
        for (var i = 0; i < levels - 1; i++) {
            const levelFactor = factor * radius * ((i + 1) / levels);
            for (var j = 0; j < totalAxes; j++) {
                levelCircles.push(
                    <line
                        key={i + '---' + j}
                        x1={levelFactor * (1 - factor * Math.sin(j * radians / totalAxes))}
                        y1={levelFactor * (1 - factor * Math.cos(j * radians / totalAxes))}
                        x2={levelFactor * (1 - factor * Math.sin((j + 1) * radians / totalAxes))}
                        y2={levelFactor * (1 - factor * Math.cos((j + 1) * radians / totalAxes))}
                        className='level-line'
                        stroke='#ABABAB'
                        opacity={.7}
                        strokeWidth={1}
                        strokeDasharray='5 1'
                        transform={'translate(' + (width / 2 - levelFactor) + ',' + (height / 2 - levelFactor) + ')'}
                    />
                );
            }
        }

        // Axes (this is a line, not a d3 axis)
        const axes = [];
        for (var i = 0; i < totalAxes; i++) {
            axes.push(
                <g key={i} className={'axis ' + allAxes[i].name}>
                    <line
                        x1={width / 2}
                        y1={height / 2}
                        x2={width / 2 * (1 - factor * Math.sin(i * radians / totalAxes))}
                        y2={height / 2 * (1 - factor * Math.cos(i * radians / totalAxes))}
                        className={'axis-line ' + allAxes[i].name}
                        stroke='grey'
                        strokeWidth={1}
                    />
                </g>
            );
        }

        // Axis labels
        const axesLabels = [];
        for (var i = 0; i < totalAxes; i++) {

            let axisRecords = [];

            if (seriesId === 'countryId') {
                axisRecords = _.filter(records, {'indicatorId': allAxes[i]._id});
            } else {
                axisRecords = _.filter(records, {'countryId': allAxes[i]._id});
            }

            const content =
                <List>

                    <List.Header content={allAxes[i].name}/>
                    <Divider fitted/>

                    {_.map(axisRecords, r => {

                        let fill = '';
                        let text = '';

                        if (seriesId === 'countryId') {
                            fill = r.countryColor;
                            text = r.countryName;
                        } else {
                            fill = '#00adc6';
                            text = r.indicatorName;
                        }

                        return (
                            <List.Item key={r.countryId + r.indicatorId}>
                                <div style={{color: fill}}>{text}</div>
                                <div>{r.value}</div>
                            </List.Item>
                        );

                    })}

                </List>;

            const trigger =
                <text
                    className={'axis-label ' + allAxes[i].name}
                    textAnchor='middle'
                    dy='1.5em'
                    fontSize={11}
                    x={width / 2 * (1 - factorLegend * Math.sin(i * radians / totalAxes)) - 60 * Math.sin(i * radians / totalAxes)}
                    y={height / 2 * (1 - Math.cos(i * radians / totalAxes)) - 20 * Math.cos(i * radians / totalAxes)}>
                    {allAxes[i].name}
                </text>;

            let fill = '';

            if (seriesId === 'countryId') {
                fill = '#00adc6';
            } else {
                if (axisRecords[0]) fill = axisRecords[0].countryColor;
            }

            axesLabels.push(
                <Popup
                    key={i}
                    style={{border: 'solid ' + fill + ' 1px'}}
                    flowing
                    hoverable
                    className='radar-chart-popup'
                    on='hover'
                    positioning='top center'
                    trigger={trigger}
                    content={content}
                />
            );

        }

        // Polygons representing the countries or indicators
        const polygons = [];
        for (var i = 0; i < totalSeries; i++) {

            let points = '';
            let record = {};
            let seriesRecords = [];

            if (seriesId === 'countryId') {
                seriesRecords = _.filter(records, {'countryId': allSeries[i]._id});
            } else {
                seriesRecords = _.filter(records, {'indicatorId': allSeries[i]._id});
            }

            for (var j = 0; j < totalAxes; j++) {

                let record = {};
                let value = 0;

                if (seriesId === 'countryId') {
                    record = _.find(seriesRecords, {'countryId': allSeries[i]._id, 'indicatorId': allAxes[j]._id});
                } else {
                    record = _.find(seriesRecords, {'indicatorId': allSeries[i]._id, 'countryId': allAxes[j]._id});
                }

                value = record ? record.value : 0;

                const value0 = width / 2 * (1 - (parseFloat(Math.max(value, 0)) / maxValue) * factor * Math.sin(j * radians / totalAxes));
                const value1 = height / 2 * (1 - (parseFloat(Math.max(value, 0)) / maxValue) * factor * Math.cos(j * radians / totalAxes));
                points += value0 + ',' + value1 + ' ';

            }

            const content =
                <List>

                    <List.Header content={allSeries[i].name}/>
                    <Divider fitted/>

                    {_.map(seriesRecords, r => {

                        let fill = '';
                        let text = '';

                        if (seriesId === 'countryId') {
                            fill = '#00adc6';
                            text = r.indicatorName;
                        } else {
                            fill = r.countryColor;
                            text = r.countryName;
                        }

                        return (
                            <List.Item key={r.countryId + r.indicatorId}>
                                <div style={{color: fill}}>{text}</div>
                                <div>{r.value}</div>
                            </List.Item>
                        );

                    })}

                </List>;

            let fill = '';

            if (seriesId === 'countryId') {
                fill = record.countryColor;
            } else {
                fill = '#00adc6';
            }

            const trigger =
                <polygon
                    className={'area ' + allSeries[i].name}
                    strokeWidth={2}
                    stroke={fill}
                    points={points}
                    fill={fill}
                    fillOpacity={opacityArea}
                />;

            polygons.push(
                <Popup
                    key={i}
                    style={{border: 'solid ' + fill + ' 1px'}}
                    flowing
                    hoverable
                    className='radar-chart-popup'
                    on='hover'
                    positioning='top center'
                    trigger={trigger}
                    content={content}
                />
            );

        }

        const mainTransform = 'translate(' + margin.left + ',' + margin.top + ')';

        return (

            <svg
                id='svg-chart'
                className='radar-chart'
                width={width + margin.left + margin.right}
                height={height + margin.top + margin.bottom}>

                <g transform={mainTransform}>
                    {levelCircles}
                    {axes}
                    {axesLabels}
                    {polygons}
                </g>

            </svg>

        )

    }

}