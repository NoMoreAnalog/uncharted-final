// Libs
import React, {Component} from 'react';
import {observer} from 'mobx-react';

// Components
import ChartType from './ChartType';
import Steps from '../Steps';

// ChartSelector component - List of charts to select on the top bar
@observer(['chartStore'])
export default class ChartSelector extends Component {

    constructor(props) {

        super(props);

        const {chartStore} = {...props};

        this._drawBar = chartStore.drawChart.bind(this, 'bar');
        this._drawLine = chartStore.drawChart.bind(this, 'line');
        this._drawRadar = chartStore.drawChart.bind(this, 'radar');
        this._drawScatter = chartStore.drawChart.bind(this, 'scatter');

    }

    componentDidMount() {

        $(this.container).visibility({
            type: 'fixed',
            zIndex: 1001
        });

    }

    render() {

        const {chartStore} = {...this.props};

        return (

            <div ref={ref => this.container = ref}>

                <div className="ui stackable borderless menu chart-selector">

                    <Steps number={3}/>
                    <div ref={ref => this.header = ref} className="header item">Available Graphs:</div>

                    <ChartType
                        click={this._drawBar}
                        active={chartStore.barActive}
                        text={'Bar'}
                        image={chartStore.barDraw ? 'bar-selected.svg' : 'bar.svg'}
                        popup="Requires a minimum of one country and one indicator."
                    />

                    <ChartType
                        click={this._drawLine}
                        active={chartStore.lineActive}
                        text={'Line'}
                        image={chartStore.lineDraw ? 'line-selected.svg' : 'line.svg'}
                        popup="Requires a minimum of one country and one indicator."
                    />

                    <ChartType
                        click={this._drawRadar}
                        active={chartStore.radarActive}
                        text={'Radar'}
                        image={chartStore.radarDraw ? 'radar-selected.svg' : 'radar.svg'}
                        popup="Requires a minimum of three countries and one indicator OR three indicators and one country."
                    />

                    <ChartType
                        click={this._drawScatter}
                        active={chartStore.scatterActive}
                        text={'Scatter'}
                        image={chartStore.scatterDraw ? 'scatter-selected.svg' : 'scatter.svg'}
                        popup="Requires a minimum of one country and exactly two indicators."
                    />

                </div>

            </div>

        )

    }

}