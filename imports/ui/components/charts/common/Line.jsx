import React, {PropTypes, Component} from 'react';
import * as d3 from 'd3';

class Line extends Component {
    render() {

        const {classed, d, strokeLineCap} = {...this.props};

        return (

            <path
                className={classed}
                d={d}
                strokeLinecap={strokeLineCap}/>

        )

    }
}

export default Line;

Line.propTypes = {
    classed: PropTypes.string,
    strokeLineCap: PropTypes.string,
    d: PropTypes.any
};

Line.defaultProps = {
    classed: 'line',
    strokeLineCap: 'round'
};