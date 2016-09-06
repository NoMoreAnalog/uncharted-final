import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';

import ChartType from './ChartType.jsx';

// ChartSelector component - List of charts to select on the top bar
@observer(['store'])
class ChartSelector extends Component {

    constructor(props) {

        super(props);

        const store = props.store;

        this._drawBar = store.drawChart.bind(this, 'bar');
        this._drawLine = store.drawChart.bind(this, 'line');
        this._drawRadar = store.drawChart.bind(this, 'radar');
        this._drawScatter = store.drawChart.bind(this, 'scatter');

    }

    componentDidMount() {

        $(this.chartSelector).visibility({
            type: 'fixed',
            zIndex: 1001
        });

    }

    render() {

        const {store} = {...this.props};

        return (

            <div className="ui stackable borderless menu chart-selector" ref={(ref) => this.chartSelector = ref}>

                <div className="header item">Available Graphs:</div>

                <ChartType
                    click={this._drawBar}
                    active={store.barActive}
                    text={'Bar'}
                    image={store.barDraw ? 'bar-selected.svg' : 'bar.svg'}
                    popup="Requires a minimum of one country and one indicator."
                />

                <ChartType
                    click={this._drawLine}
                    active={store.lineActive}
                    text={'Line'}
                    image={store.lineDraw ? 'line-selected.svg' : 'line.svg'}
                    popup="Requires a minimum of one country and one indicator."
                />

                <ChartType
                    click={this._drawRadar}
                    active={store.radarActive}
                    text={'Radar'}
                    image={store.radarDraw ? 'radar-selected.svg' : 'radar.svg'}
                    popup="Requires a minimum of three countries and one indicator OR three indicators and one country."
                />

                <ChartType
                    click={this._drawScatter}
                    active={store.scatterActive}
                    text={'Scatter'}
                    image={store.scatterDraw ? 'scatter-selected.svg' : 'scatter.svg'}
                    popup="Requires a minimum of one country and exactly two indicators."
                />

            </div>

        )

    }

}

ChartSelector.wrappedComponent.propTypes = {
    store: PropTypes.any.isRequired
};

ChartSelector.wrappedComponent.defaultProps = {};

export default ChartSelector;