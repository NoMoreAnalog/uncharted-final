import React, {PropTypes, Component} from 'react';

class Bar extends Component {

    componentDidMount() {
        this._tweenHeight()
    }

    componentDidUpdate() {
        this._tweenHeight()
    }

    _tweenHeight() {

        const {height, i} = {...this.props};

        TweenLite.to(this.bar, 0, {
            attr: {height: 0},
            ease: Linear.easeNone
        });

        Meteor.setTimeout(() => {
            TweenLite.to(this.bar, .2, {
                attr: {height: height},
                ease: Linear.easeNone
            });
        }, 50 * i);

    }

    render() {

        const {classed, x, fill, width, height} = {...this.props};

        return (

            <rect
                ref={(ref) => this.bar = ref}
                className={classed}
                x={x}
                y={0}
                fill={fill}
                height={height}
                width={width}
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
    fill: '7dc7f4'
};