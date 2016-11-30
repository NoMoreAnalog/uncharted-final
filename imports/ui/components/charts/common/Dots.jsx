import React, {Component} from 'react';
import {Popup, List, Divider} from 'semantic-ui-react'

import Dot from './Dot.jsx'

export default class Dots extends Component {

    render() {

        let {data, x, y, endPoints, fill} = {...this.props};

        if (!endPoints) {
            // Remove last & first point
            data = data.splice(1);
            data.pop();
        }

        return (
            <g>
                {data.map(d => {

                    const trigger =
                        <circle
                            className={'dot'}
                            r={5}
                            cx={x(d.year)}
                            cy={y(d.value)}
                            fill={fill}
                            strokeOpacity={0}
                            stroke={fill}
                            strokeWidth={10 + 'px'}
                            onMouseOver={e => e.target.setAttribute('stroke-opacity', '0.2')}
                            onMouseOut={e => e.target.setAttribute('stroke-opacity', '0')}
                        />;

                    const dot =
                        <Dot
                            cx={x(d.year)}
                            cy={y(d.value)}
                            fill={fill}
                            strokeOpacity={.2}
                            stroke={fill}
                            strokeWidth={10}
                        />;

                    const content =
                        <List>
                            <List.Header content={d.year}/>
                            <Divider fitted/>
                            <List.Item key={d.countryId + d.indicatorId + d.year}>
                                <div style={{color: fill}}>{d.countryName}</div>
                                <div style={{color: '#00adc6'}}>{d.indicatorCode}</div>
                                <div>{d.value}</div>
                            </List.Item>
                        </List>;

                    return (
                        <Popup
                            key={d.countryId + d.indicatorId + d.year}
                            style={{border: 'solid ' + fill + ' 1px'}}
                            flowing
                            hoverable
                            className='line-chart-popup'
                            on='hover'
                            positioning='top center'
                            trigger={trigger}
                            content={content}/>
                    );

                })}
            </g>
        )

    }

}

Dots.propTypes = {
    data: React.PropTypes.array.isRequired,
    x: React.PropTypes.func.isRequired,
    y: React.PropTypes.func.isRequired,
    endPoints: React.PropTypes.bool,
    fill: React.PropTypes.string
};

Dots.defaultProps = {
    endPoints: true
};