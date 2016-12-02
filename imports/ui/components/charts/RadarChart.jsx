// Libs
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Popup, List, Divider} from 'semantic-ui-react';
import * as d3 from 'd3';
import * as _ from 'lodash';

// Components
import NoChartsMessage from './NoChartsMessage.jsx';

// RadarChart - Component displayed when radar chart is selected
@observer(['countryStore', 'indicatorStore', 'recordStore', 'chartStore'])
export default class RadarChart extends Component {

    state = {blobsSorted: false};

    opacityArea = .01; // The opacity of the area of the blob

    componentDidMount() {
        this.setState({blobSorted: true})
    }

    componentDidUpdate() {
        this._sortBlobs();
    }

    _sortBlobs() {
        const wrappers = document.getElementsByClassName('radar-wrapper');
        const sortedWrappers = _.sortBy(wrappers, w => w.childNodes[1].getTotalLength());
        _.forEachRight(sortedWrappers, w => w.parentNode.appendChild(w));
    }

    _blobOnMouseOver = event => {

        //Reset all blobs
        d3.selectAll('.radar-area')
            .transition().duration(200)
            .style('fill-opacity', this.opacityArea);

        //Bring back the hovered over blob
        d3.select(event.target)
            .transition().duration(200)
            .style('fill-opacity', 0.6);

    }

    _blobOnMouseOut = () => {

        //Reset all blobs
        d3.selectAll('.radar-area')
            .transition().duration(200)
            .style('fill-opacity', this.opacityArea);

    }

    render() {

        const {countryStore, indicatorStore, recordStore, chartStore} = {...this.props},
            records = recordStore.recordsToDraw;

        let countries = [],
            indicators = [];

        for (let i = 0; i < records.length; i++) {
            if (!_.find(countries, {'_id': records[i].countryId})) {
                countries.push({
                    '_id': records[i].countryId,
                    'name': records[i].countryName,
                    'color': records[i].countryColor
                });
            }
            if (!_.find(indicators, {'_id': records[i].indicatorId})) {
                indicators.push({
                    '_id': records[i].indicatorId,
                    'name': records[i].indicatorName,
                    'color': '#00adc6'
                });
            }
        }

        if (_.size(records) === 0) {
            return <NoChartsMessage noData/>;
        }

        let margin = { // the radar chart is special
                top: chartStore.margin.top + 50,
                bottom: chartStore.margin.bottom + 25
            },
            height = chartStore.width / 2 + chartStore.margin.left + chartStore.margin.right,
            width = height; // needs to be square

        if (height > 450) {
            height = 400;
            width = 400;
        }

        margin.left = (chartStore.width / 2) - (width / 2);
        margin.right = (chartStore.width / 2) - (width / 2);

        const levels = 6, // How many levels or inner circles should there be drawn
            opacityArea = this.opacityArea, // The opacity of the area of the blob
            strokeWidth = 2, // The width of the stroke around each blob
            labelFactor = 1.2, // How much farther than the radius of the outer circle should the labels be placed
            maxValue = d3.max(records, r => r.value),
            radius = Math.min(width / 2, height / 2), // Radius of the outermost circle
            rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]); // Scale for the radius

        let allAxes = [],
            allSeries = [],
            seriesId = '';

        if (_.size(indicators) >= 3) {
            allAxes = indicators
            allSeries = countries
            seriesId = 'countryId';
        } else {
            allAxes = countries
            allSeries = indicators
            seriesId = 'indicatorId';
        }

        const totalAxes = _.size(allAxes), // The number of different axes
            totalSeries = _.size(allSeries), // The number of different series
            angleSlice = Math.PI * 2 / totalAxes; // The width in radians of each "slice"

        if (totalAxes < 3) {
            return <NoChartsMessage noData/>;
        }

        /////////////////////////////////////////////////////////
        ////////// Glow filter for some extra pizzazz ///////////
        /////////////////////////////////////////////////////////

        //Filter for the outside glow
        const filter =
            <defs>
                <filter id='glow'>
                    <feGaussianBlur stdDeviation='2.5' result='coloredBlur'/>
                    <feMerge>
                        <feMergeNode in='coloredBlur'/>
                        <feMergeNode in='SourceGraphic'/>
                    </feMerge>
                </filter>
            </defs>

        /////////////////////////////////////////////////////////
        /////////////// Draw the circular grid //////////////////
        /////////////////////////////////////////////////////////

        const circularGrid = [];
        const levelsReverse = d3.range(1, (levels + 1)).reverse();
        for (var i = 0; i < levelsReverse.length; i++) {
            circularGrid.push(
                <circle
                    key={i}
                    className='circular-grid'
                    r={radius / levels * levelsReverse[i]}
                    fill='#CDCDCD'
                    stroke='#CDCDCD'
                    fillOpacity={.1}
                    filter='url(#glow)'
                />
            );
        }

        /////////////////////////////////////////////////////////
        //////////////////// Draw the axes //////////////////////
        /////////////////////////////////////////////////////////

        const axes = [];
        const axesLabels = [];
        for (var i = 0; i < totalAxes; i++) {

            axes.push(
                <g
                    key={i}
                    className={'axis ' + allAxes[i].name}>
                    <line
                        className={'line'}
                        x1={0}
                        y1={0}
                        x2={rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2)}
                        y2={rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2)}
                        stroke={'white'}
                        strokeWidth={2}
                    />
                </g>
            );

            let axisRecords = [];

            if (seriesId === 'countryId') {
                axisRecords = _.filter(records, {'indicatorId': allAxes[i]._id});
            } else {
                axisRecords = _.filter(records, {'countryId': allAxes[i]._id});
            }

            const content =
                <List>

                    <List.Header>
                        <div style={{color: allAxes[i].color}}>{allAxes[i].name}</div>
                        <Divider fitted/>
                    </List.Header>

                    {_.map(axisRecords, r => {

                        let fill = '';
                        let text = '';

                        if (seriesId === 'countryId') {
                            fill = r.originalColor;
                            text = r.countryName;
                        } else {
                            fill = '#00adc6';
                            text = r.indicatorName;
                        }

                        return (
                            <List.Item key={r.countryId + r.indicatorId + r.year}>
                                <div style={{color: fill}}>{text}</div>
                                <div>{r.value}</div>
                            </List.Item>
                        );

                    })}

                </List>;

            const trigger =
                <text
                    key={i}
                    className={'axis-label ' + allAxes[i].name}
                    fontSize={11}
                    textAnchor='middle'
                    dy='0.35em'
                    x={rScale(maxValue * labelFactor) * Math.cos(angleSlice * i - Math.PI / 2)}
                    y={rScale(maxValue * labelFactor) * Math.sin(angleSlice * i - Math.PI / 2)}>
                    {allAxes[i].name}
                </text>;

            axesLabels.push(
                <Popup
                    key={i}
                    style={{border: 'solid ' + allAxes[i].color + ' 1px'}}
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

        /////////////////////////////////////////////////////////
        ///////////// Draw the radar chart blobs ////////////////
        /////////////////////////////////////////////////////////

        const radarLine = d3.radialLine()
            .curve(d3.curveCardinalClosed.tension(.5))
            .radius(d => {
                return rScale(d.value);
            })
            .angle((d, i) => i * angleSlice);

        const blobs = [];
        for (var i = 0; i < totalSeries; i++) {

            let seriesRecords = [];

            if (seriesId === 'countryId') {
                seriesRecords = _.filter(records, {'countryId': allSeries[i]._id});
            } else {
                seriesRecords = _.filter(records, {'indicatorId': allSeries[i]._id});
            }

            const content =
                <List>

                    <List.Header>
                        <div style={{color: allSeries[i].color}}>{allSeries[i].name}</div>
                        <Divider fitted/>
                    </List.Header>

                    {_.map(seriesRecords, r => {

                        let fill = '';
                        let text = '';

                        if (seriesId === 'countryId') {
                            fill = '#00adc6';
                            text = r.indicatorName;
                        } else {
                            fill = r.originalColor;
                            text = r.countryName;
                        }

                        return (
                            <List.Item key={r.countryId + r.indicatorId + r.year}>
                                <div style={{color: fill}}>{text}</div>
                                <div>{r.value}</div>
                            </List.Item>
                        );

                    })}

                </List>;

            const trigger =
                <g
                    className={'radar-wrapper ' + allSeries[i].name}>
                    <path
                        className='radar-area'
                        d={radarLine(seriesRecords)}
                        fill={allSeries[i].color}
                        fillOpacity={opacityArea}
                        onMouseOver={this._blobOnMouseOver}
                        onMouseOut={this._blobOnMouseOut}
                    />
                    <path
                        className='radar-stroke'
                        d={radarLine(seriesRecords)}
                        strokeWidth={strokeWidth}
                        stroke={allSeries[i].color}
                        fill={'none'}
                        filter='url(#glow)'
                    />
                </g>

            blobs.push(
                <Popup
                    key={i}
                    style={{border: 'solid ' + allSeries[i].color + ' 1px'}}
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

        if (_.size(blobs) === 0) {
            return <NoChartsMessage noData/>;
        }

        const mainTransform = 'translate(' + (width / 2 + margin.left) + ',' + (height / 2 + margin.top) + ')';

        return (

            <svg
                id='svg-chart'
                className='radar-chart'
                width={width + margin.left + margin.right}
                height={height + margin.top + margin.bottom}>

                <g transform={mainTransform}>
                    {filter}
                    {circularGrid}
                    {axes}
                    {axesLabels}
                    {blobs}
                </g>

            </svg>

        )

    }

}