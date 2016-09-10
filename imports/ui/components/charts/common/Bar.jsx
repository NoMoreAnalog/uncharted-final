import React, {PropTypes, Component} from 'react';
import * as d3 from 'd3';

class Bar extends Component {

    render() {

        const props = this.props;

        return (

            <rect
                className={props.classed}
                x={props.x}
                y={props.y}
                fill={props.fill}
                height={props.height}
                width={props.width}
            />

        )

    }
}

export default Bar;

Bar.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    classed: PropTypes.string,
    fill: PropTypes.string
};

Bar.defaultProps = {
    classed: 'bar',
    fill: '#7dc7f4'
};