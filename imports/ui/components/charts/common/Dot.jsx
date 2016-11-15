import React, {PropTypes, Component} from 'react';

// Dot component - Dot to display on chart or next to country name
class Dot extends Component {
    render() {

        const {cx, cy, classed, radius, fill, stroke, strokeWidth, createSvg} = {...this.props};

        return createSvg ?

            <div>
                <svg className='dot'
                     width={(radius + strokeWidth) * 2}
                     height={(radius + strokeWidth) * 2}>
                    <circle
                        className={classed}
                        r={radius}
                        cx={radius + strokeWidth}
                        cy={radius + strokeWidth}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                    />
                </svg>
            </div>

            :

            <circle
                className={classed}
                r={radius}
                cx={cx}
                cy={cy}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth + 'px'}
            />;

    }
}

export default Dot;

Dot.propTypes = {
    cx: PropTypes.number,
    cy: PropTypes.number,
    classed: PropTypes.string,
    radius: PropTypes.number,
    fill: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
    createSvg: PropTypes.bool
};

Dot.defaultProps = {
    cx: 0,
    cy: 0,
    classed: 'dot',
    radius: 5,
    fill: '#000000',
    stroke: '#000000',
    strokeWidth: 0,
    createSvg: false
};