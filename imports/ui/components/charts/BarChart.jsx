import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';
import * as d3 from 'd3';
import * as _ from 'lodash';

import Bar from './common/Bar.jsx';
import Grid from './common/Grid.jsx';
import Axis from './common/Axis.jsx';

// Line chart - Component displayed when line chart is selected
@observer(['countryStore', 'indicatorStore', 'recordStore', 'store'])
class BarChart extends Component {

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
            .padding(.5);

        const x1 = d3.scaleBand(),
            years = [];

        if (_.size(countryIds) === 1) {

            x1.domain(indicatorIds).range([0, x0.bandwidth()]);

            _.forOwn(yearData, (d, year) => {
                years.push(
                    <g key={year} className='year' transform={'translate(' + x0(year) + ',0)'}>
                        {d.map((d, i) =>
                            <Bar
                                key={d.countryId + d.indicatorId + d.year}
                                height={height - y(d.value)}
                                width={x1.bandwidth()}
                                x={x1(d.indicatorId)}
                                y={y(d.value)}
                                fill={d.countryColor}
                                i={i}
                            />
                        )}
                    </g>);
            });

        } else {

            x1.domain(countryIds).range([0, x0.bandwidth()]);

            _.forOwn(yearData, (d, year) => {
                years.push(
                    <g key={year} className='year' transform={'translate(' + x0(year) + ',0)'}>
                        {d.map(d =>
                            <Bar
                                key={d.countryId + d.indicatorId + d.year}
                                height={height - y(d.value)}
                                width={x1.bandwidth()}
                                x={x1(d.countryId)}
                                y={y(d.value)}
                                fill={d.countryColor}
                            />
                        )}
                    </g>);
            });

        }

        const mainTransform = 'translate(' + margin.left + ',' + margin.top + ')';
        const yearsTransform = 'scale(1,-1) translate(0,-' + height + ')';

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

export default BarChart;

BarChart.wrappedComponent.propTypes = {
    countryStore: PropTypes.any.isRequired,
    indicatorStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired
};

BarChart.wrappedComponent.defaultProps = {};