import React, {Component} from 'react';

import Dot from './Dot.jsx'

class Dots extends Component {
    render() {

        let {data, x, y, endPoints} = {...this.props};

        if (!endPoints) {
            // Remove last & first point
            data = data.splice(1);
            data.pop();
        }

        return (
            <g>
                {data.map((d, i) =>
                    <Dot
                        key={d.country + d.indicator + d.year}
                        cx={x(d.year)}
                        cy={y(d.value)}
                    />
                )}
            </g>
        )
    }
}

export default Dots;

Dots.propTypes = {
    data: React.PropTypes.array.isRequired,
    x: React.PropTypes.func.isRequired,
    y: React.PropTypes.func.isRequired,
    endPoints: React.PropTypes.bool
};

Dots.defaultProps = {
    endPoints: true
};