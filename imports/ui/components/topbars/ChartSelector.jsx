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

        const store = this.props.store;

        return (

            <div className="chart-selector" ref={(ref) => this.chartSelector = ref}>

                <div className="label">Available Graphs:</div>

                <div className="ui very relaxed horizontal list">

                    <ChartType
                        click={this._drawBar}
                        active={store.barActive}
                        content={'Bar'}
                        imageSource={store.barDraw ? 'bar-selected.svg' : 'bar.svg'}
                        popup="Requires a minimum of one country and one indicator."
                    />

                    <ChartType
                        click={this._drawLine}
                        active={store.lineActive}
                        content={'Line'}
                        imageSource={store.lineDraw ? 'line-selected.svg' : 'line.svg'}
                        popup="Requires a minimum of one country and one indicator."
                    />

                    <ChartType
                        click={this._drawRadar}
                        active={store.radarActive}
                        content={'Radar'}
                        imageSource={store.radarDraw ? 'radar-selected.svg' : 'radar.svg'}
                        popup="Requires a minimum of three countries and one indicator OR three indicators and one country."
                    />

                    <ChartType
                        click={this._drawScatter}
                        active={store.scatterActive}
                        content={'Scatter'}
                        imageSource={store.scatterDraw ? 'scatter-selected.svg' : 'scatter.svg'}
                        popup="Requires a minimum of one country and exactly two indicators."
                    />

                </div>

            </div>

        )

    }

}

ChartSelector.wrappedComponent.propTypes = {
    store: PropTypes.any.isRequired
};

ChartSelector.wrappedComponent.defaultProps = {};

export default ChartSelector;