import React, {PropTypes, Component} from 'react';
import * as d3 from 'd3';
import * as _ from 'lodash';

export default class Axis extends Component {

    componentDidMount() {
        this._renderAxis();
    }

    componentDidUpdate() {
        this._renderAxis();
    }

    _renderAxis() {

        const {scale, axisType, checkYears, scatterChart} = {...this.props};

        if (axisType === 'y') {

            const axis = d3.axisLeft(scale);

            d3.select(this.axis).call(axis);

        } else if (axisType === 'x') {

            // Get list of years

            if (checkYears) {

                const first = scale.domain()[0];
                const last = scale.domain()[scale.domain().length - 1];
                const tickValues = [];

                for (let year = first; year <= last; year++) {
                    tickValues.push(year);
                }

                const axis = d3.axisBottom(scale)
                    .tickValues(tickValues)
                    .tickFormat(d3.format('d'));

                d3.select(this.axis).call(axis);

            } else {

                const axis = d3.axisBottom(scale);

                d3.select(this.axis).call(axis);

            }

        }

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

Axis.propTypes = {
    height: PropTypes.number.isRequired,
    scale: PropTypes.func.isRequired,
    axisType: PropTypes.oneOf(['x', 'y']).isRequired,
    checkYears: PropTypes.bool
};