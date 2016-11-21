import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';
import {List, Divider} from 'semantic-ui-react'
import * as d3 from 'd3';
import * as _ from 'lodash';

import Bar from './common/Bar.jsx';
import Grid from './common/Grid.jsx';
import Axis from './common/Axis.jsx';
import CustomPopup from './common/CustomPopup.jsx';

// Bar chart - Component displayed when bar chart is selected
@observer(['countryStore', 'indicatorStore', 'recordStore', 'store'])
export default class BarChart extends Component {

    render() {

        const {countryStore, indicatorStore, recordStore, store} = {...this.props},
            margin = {top: 5, right: 35, bottom: 20, left: 50},
            width = store.width - margin.left - margin.right,
            height = store.height - margin.top - margin.bottom,
            records = recordStore.recordsToDraw,
            yearData = _.groupBy(records, 'year'),
            countryIds = countryStore.countriesToDraw.map(c => c._id),
            indicatorIds = indicatorStore.indicatorsToDraw.map(c => c._id);

        if (_.size(countryIds) === 0 || _.size(indicatorIds) === 0) {
            return null;
        }

        const countryFocus = _.size(countryIds) === 1;

        const y = d3.scaleLinear()
            .domain([0, d3.max(records, r => r.value)])
            .range([height, 0]);

        const allYears = _.map(_.uniqBy(records, 'year'), d => d.year);
        const first = allYears[0];
        const last = allYears[allYears.length - 1];
        const domain = [];

        for (let year = first; year <= last; year++) {
            domain.push(year);
        }

        const x0 = d3.scaleBand()
            .domain(domain)
            .range([0, width])
            .padding(.3);

        const x1 = d3.scaleBand();

        (countryFocus) ?
            x1.domain(indicatorIds).range([0, x0.bandwidth()]) :
            x1.domain(countryIds).range([0, x0.bandwidth()]);

        const years = [];

        _.forOwn(yearData, (d, year) => {

            const colorRect =
                <rect
                    className="year-area"
                    fill='#ABABAB'
                    height={height}
                    width={x0.bandwidth()}
                    x={0}
                    y={0}
                    fillOpacity={0}
                />;

            const bars = d.map(d2 => {
                return (
                    <Bar
                        key={d2.countryId + d2.indicatorId + d2.year}
                        height={height - y(d2.value)}
                        width={x1.bandwidth()}
                        x={countryFocus ? x1(d2.indicatorId) : x1(d2.countryId)}
                        y={y(d2.value)}
                        fill={d2.countryColor}
                    />
                )
            });

            const hoverRect =
                <rect
                    onMouseOver={e => e.target.parentNode.getElementsByClassName('year-area')[0].setAttribute('fill-opacity', '0.1')}
                    onMouseOut={e => e.target.parentNode.getElementsByClassName('year-area')[0].setAttribute('fill-opacity', '0')}
                    fillOpacity={0}
                    height={height}
                    width={x0.bandwidth()}
                    x={0}
                    y={0}
                />;

            const list =
                <List>
                    <List.Header content={year}/>
                    <Divider fitted/>
                    {d.map(d2 => {
                        const name = countryFocus ? d2.indicatorCode : d2.countryName;
                        return (
                            <List.Item key={d2.countryId + d2.indicatorId + d2.year}>
                                <span style={{color: d2.countryColor}}>{name}</span>&nbsp;&nbsp;&nbsp;{d2.value}
                            </List.Item>
                        )
                    })}
                </List>;

            const popup =
                <CustomPopup
                    style={{border: 'none'}}
                    flowing
                    basic
                    hoverable
                    className='bar-chart-popup'
                    on='hover'
                    positioning='top center'
                    trigger={hoverRect}
                    children={list}>
                </CustomPopup>;

            years.push(
                <g
                    key={year}
                    className='year'
                    transform={'translate(' + x0(year) + ',0)'}>
                    {colorRect}
                    {bars}
                    {popup}
                </g>
            );

        });

        const mainTransform = 'translate(' + margin.left + ',' + margin.top + ')';
        const yearsTransform = 'scale(1,-1) translate(0,-' + height + ')'; // mirror it on x axis

        return (

            <svg
                className='bar-chart'
                width={width + margin.left + margin.right}
                height={height + margin.top + margin.bottom}>

                <g transform={mainTransform}>

                    <Grid height={height} width={width} scale={y} gridType='horizontal'/>

                    <Axis height={height} scale={y} axisType='y'/>
                    <Axis height={height} scale={x0} axisType='x'/>

                    <g className='years' transform={yearsTransform}>
                        {years}
                    </g>

                </g>

            </svg>

        )

    }

}