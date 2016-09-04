import React, {PropTypes} from 'react';

// Dot component - Dot to display on chart or next to country name
const Dot = (props) => (

    <div className="dot">
        {props.createSvg ?
            <svg
                width={(props.radius + props.strokeWidth) * 2}
                height={(props.radius + props.strokeWidth) * 2}
            >
                <circle
                    className={props.classed}
                    r={props.radius}
                    cx={props.radius + props.strokeWidth}
                    cy={props.radius + props.strokeWidth}
                    fill={props.fill}
                    stroke={props.stroke}
                    strokeWidth={props.strokeWidth}
                />
            </svg> :
            <circle
                className={props.classed}
                r={props.radius}
                cx={props.cx}
                cy={props.cy}
                fill={props.fill}
                stroke={props.stroke}
                strokeWidth={props.strokeWidth}
            />}
    </div>

)

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

export default Dot;