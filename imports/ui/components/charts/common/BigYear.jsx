import React, {Component, PropTypes} from 'react';

// BigYear component - Display current year
export default class BigYear extends Component {

    render() {

        const {x, y, year} = {...this.props};

        const transform = 'translate(' + x + ',' + y + ')';

        return (
            <g
                className={'big-year'}
                transform={transform}>
                <text
                    fill='#636363'
                    fillOpacity={.35}
                    fontSize={100}
                    textAnchor='end'>
                    {year}
                </text>
            </g>
        )

    }

}

BigYear.propTypes = {
    x: PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    year: React.PropTypes.number.isRequired
};