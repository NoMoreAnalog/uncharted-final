import React, {PropTypes, Component} from 'react';
import * as d3 from 'd3';

class Line extends Component {
    render() {

        const {data, x, y, classed, strokeLineCap} = {...this.props};

        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.count))
            .curve(d3.curveCardinal.tension(0));

        return (

            <path
                className={classed}
                d={line(data)}
                strokeLinecap={strokeLineCap}/>

        )

    }
}

export default Line;

Line.propTypes = {
    data: PropTypes.array.isRequired,
    x: React.PropTypes.func.isRequired,
    y: React.PropTypes.func.isRequired,
    classed: PropTypes.string,
    strokeLineCap: PropTypes.string,
};

Line.defaultProps = {
    classed: 'line',
    strokeLineCap: 'round'
};