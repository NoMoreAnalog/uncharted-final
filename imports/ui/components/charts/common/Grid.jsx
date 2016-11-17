import React, {PropTypes, Component} from 'react';
import * as d3 from 'd3';

class Grid extends Component {

    componentDidMount() {
        this._renderGrid();
    }

    componentDidUpdate() {
        this._renderGrid();
    }

    _renderGrid() {
        const grid = d3.axisLeft(this.props.scale)
            // .ticks(5)
            .tickSize(-this.props.width, 0, 0)
            .tickFormat('');

        d3.select(this.grid)
            .attr('class', 'grid')
            .call(grid);
    }

    render() {

        var translate = 'translate(0,' + (this.props.h) + ')';
        return (
            <g
                ref={(ref) => this.grid = ref}
                className="y-grid"
                transform={this.props.gridType == 'x' ? translate : ''}
            />
        );

    }
}

export default Grid;

Grid.propTypes = {
    scale: PropTypes.func.isRequired,
    height: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    gridType: React.PropTypes.oneOf(['x', 'y']).isRequired
};

Grid.defaultProps = {};