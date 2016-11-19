import React, {PropTypes, Component} from 'react';
import * as d3 from 'd3';

class Axis extends Component {

    componentDidMount() {
        this._renderAxis();
    }

    componentDidUpdate() {
        this._renderAxis();
    }

    _renderAxis() {

        const axis = this.props.axisType === 'y' ?
            d3.axisLeft(this.props.scale) : // y scale
            d3.axisBottom(this.props.scale) // x scale
                .tickFormat(d3.format('d'))
                .ticks(8);

        d3.select(this.axis).call(axis);
    }

    render() {

        const {height, axisType} = {...this.props};

        const translate = 'translate(0,' + (height) + ')';

        const transform = axisType === 'x' ? translate : '';

        return (
            <g
                ref={(ref) => this.axis = ref}
                className={axisType + '-axis'}
                transform={transform}
            />
        );

    }

}

export default Axis;

Axis.propTypes = {
    // data: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    scale: PropTypes.func.isRequired,
    axisType: PropTypes.oneOf(['x', 'y']).isRequired
};

Axis.defaultProps = {};