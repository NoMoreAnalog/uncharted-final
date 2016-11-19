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

        const {height, width, scale, gridType} = {...this.props};

        if (gridType === 'horizontal') {

            const grid = d3.axisLeft(scale)
                .tickSize(-width, 0, 0)
                .tickFormat('');

            d3.select(this.grid)
                .attr('class', 'grid')
                .call(grid);

        } else if (gridType === 'vertical') {

            const grid = d3.axisBottom(scale)
                .tickSize(-height, 0, 0)
                .tickFormat('');

            d3.select(this.grid)
                .attr('class', 'grid')
                .call(grid);

        }

    }

    render() {

        const {height, gridType} = {...this.props};

        const transform = 'translate(0,' + height + ')';

        return (
            <g
                ref={(ref) => this.grid = ref}
                className="grid"
                transform={gridType === 'horizontal' ? '' : transform}
            />
        );

    }
}

export default Grid;

Grid.propTypes = {
    scale: PropTypes.func.isRequired,
    height: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    gridType: React.PropTypes.oneOf(['horizontal', 'vertical']).isRequired
};

Grid.defaultProps = {};