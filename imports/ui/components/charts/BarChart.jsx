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

    _shadeColor2(color, percent) {
        var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
        return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
    }

    render() {

        const {countryStore, indicatorStore, recordStore, store} = {...this.props},
            margin = {top: 5, right: 50, bottom: 20, left: 50},
            width = store.width - margin.left - margin.right,
            height = store.height - margin.top - margin.bottom,
            records = recordStore.recordsToDraw,
            yearData = _.groupBy(records, 'year'),
            countryIds = countryStore.countriesToDraw.map(c => c._id),
            indicatorIds = indicatorStore.indicatorsToDraw.map(c => c._id);

        if (_.size(countryIds) === 0 || _.size(indicatorIds) === 0) {
            return null;
        }

        const y = d3.scaleLinear()
            .domain([0, d3.max(records, r => r.value)])
            .range([height, 0]);

        const x0 = d3.scaleBand()
            .domain(_.map(_.uniqBy(records, 'year'), d => d.year))
            .range([0, width])
            .padding(.2);

        const x1 = d3.scaleBand();

        const years = [];

        (_.size(countryIds) === 1) ?
            x1.domain(indicatorIds).range([0, x0.bandwidth()]) :
            x1.domain(countryIds).range([0, x0.bandwidth()]);

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

            const bars =
                d.map((d2, i) => {
                        let color;
                        if (_.size(countryIds) === 1) {
                            color = this._shadeColor2(d2.countryColor, i / d.length);
                        } else {
                            color = d2.countryColor;
                        }
                        return (
                            <Bar
                                key={d2.countryId + d2.indicatorId + d2.year}
                                height={height - y(d2.value)}
                                width={x1.bandwidth()}
                                x={_.size(countryIds) === 1 ? x1(d2.indicatorId) : x1(d2.countryId)}
                                y={y(d2.value)}
                                fill={color}
                            />
                        )
                    }
                );

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
                    {d.map((d2, i) => {
                        let name, style;
                        if (_.size(countryIds) === 1) {
                            name = d2.indicatorCode;
                            style = {color: this._shadeColor2(d2.countryColor, i / d.length)};
                        } else {
                            name = d2.countryName;
                            style = {color: d2.countryColor};
                        }
                        return (
                            <List.Item key={d2.countryId + d2.indicatorId}>
                                <span style={style}>{name}</span>&nbsp;&nbsp;&nbsp;{d2.value}
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
                </g>);
        });

        const mainTransform = 'translate(' + margin.left + ',' + margin.top + ')';
        const yearsTransform = 'scale(1,-1) translate(0,-' + height + ')'; // mirror it on x axis

        return (

            <svg
                className='bar-chart'
                width={width + margin.left + margin.right}
                height={height + margin.top + margin.bottom}>

                <g transform={mainTransform}>

                    <Grid height={height} width={width} scale={y} gridType='y'/>

                    <g className='years' transform={yearsTransform}>
                        {years}
                    </g>

                    <Axis height={height} scale={y} axisType='y'/>
                    <Axis height={height} scale={x0} axisType='x'/>

                </g>

            </svg>

        )

    }

}