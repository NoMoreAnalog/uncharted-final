import React, {PropTypes, Component} from 'react';
import * as d3 from 'd3';

export default class Axis extends Component {

    componentDidMount() {
        this._renderAxis();
    }

    componentDidUpdate() {
        this._renderAxis();
    }

    _renderAxis() {

        const {scale, axisType, checkYears} = {...this.props};

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

        const {height, width, margin, axisType, label} = {...this.props};

        const translate = 'translate(0,' + (height) + ')';
        const transform = axisType === 'x' ? translate : '';
        const textTransform = axisType === 'x' ?
        'translate(' + (width / 2) + ',' + ( margin.bottom * .8) + ')' :
        'translate(' + (-margin.left * .8) + ',' + (height / 2) + ')rotate(-90)';

        return (
            <g
                ref={(ref) => this.axis = ref}
                className={axisType + '-axis'}
                transform={transform}>
                <text
                    fill='#636363'
                    fontSize={12}
                    textAnchor='middle'
                    transform={textTransform}>
                    {label}
                </text>
            </g>
        );

    }

}

Axis.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number,
    margin: PropTypes.object,
    scale: PropTypes.func.isRequired,
    axisType: PropTypes.oneOf(['x', 'y']).isRequired,
    checkYears: PropTypes.bool,
    label: PropTypes.string
};

Axis.defaultProps = {
    width: 0,
    margin: {top: 0, bottom: 0, left: 0, right: 0}
};