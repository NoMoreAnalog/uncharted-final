import React, {PropTypes, Component} from 'react';

class Bar extends Component {

    componentDidMount() {
        this._tweenHeight(0)
    }

    componentDidUpdate(prevProps, prevState) {
        this._tweenHeight(prevProps.height)
    }

    _tweenHeight(fromHeight) {

        const {height} = {...this.props};

        TweenLite.to(this.bar, 0, {
            attr: {height: fromHeight},
            ease: Power1.easeOut
        });

        TweenLite.to(this.bar, .2, {
            attr: {height: height},
            ease: Power1.easeOut
        });

    }

    render() {

        const {transform, classed, x, fill, width, height} = {...this.props};

        return (

            <rect
                transform={transform}
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
    fill: PropTypes.string,
    transform: PropTypes.string
};

Bar.defaultProps = {
    classed: 'bar',
    fill: '7dc7f4',
    transform: 'translate(0,0)'
};