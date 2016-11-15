import React, {PropTypes, Component} from 'react';

class Line extends Component {

    constructor(props) {
        super(props);
        // This is done using CSS keyframes instead
        // this.state = {offset: '500%'};
        // Meteor.setTimeout(() => this.setState({offset: '0%'}), 50);
    }

    render() {

        const {classed, d, strokeLineCap, stroke, fill, strokeWidth} = {...this.props};

        // These are path attributes for when we do not use CSS keyframes
        // strokeDashoffset={this.state.offset}
        // strokeDasharray="500%"

        return (

            <path
                stroke={stroke}
                fill={fill}
                strokeWidth={strokeWidth}
                className={classed}
                d={d}
                strokeLinecap={strokeLineCap}
            />

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
    strokeLineCap: 'round',
    fill: 'none',
    stroke: '#7dc7f4',
    strokeWidth: '5px'
};