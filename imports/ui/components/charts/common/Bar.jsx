import React, {PropTypes, Component} from 'react';

class Bar extends Component {

    constructor(props) {
        super(props);
        this.state = {height: 0};
    }

    componentDidMount() {

        const props = this.props;

        Meteor.setTimeout(() => {
            TweenLite.to(this.bar, .2, {
                attr: {height: props.height},
                ease: Linear.easeNone
            });
            // this.setState({height: props.height});
        }, 50 * props.i);

    }

    render() {

        const props = this.props;

        return (

            <rect
                ref={(ref) => this.bar = ref}
                className={props.classed}
                x={props.x}
                y={0}
                fill={props.fill}
                height={this.state.height}
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