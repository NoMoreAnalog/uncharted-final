import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Header} from 'semantic-ui-react';

import ChartWrapper from './ChartWrapper.jsx';
import Menu from './Menu.jsx';
import YearSlider from './YearSlider.jsx';
import Legends from './legend/Legends.jsx';

// ChartArea component - Area for chart and chart information
@observer(['chartStore', 'recordStore'])
export default class ChartArea extends Component {

    render() {

        const {chartStore, recordStore} = {...this.props};

        let header =
            <Header as='h1' className='title'>
                <div className='content'>
                    {chartStore.chartTitle}
                    <hr/>
                </div>
            </Header>;

        if (!chartStore.chartTitle) header = <div/>

        let menu = <Menu/>;
        if (!chartStore.barDraw && !chartStore.lineDraw && !chartStore.radarDraw && !chartStore.scatterDraw) menu = <div/>;

        let yearSlider = <YearSlider/>;
        if (!chartStore.barDraw && !chartStore.lineDraw && !chartStore.radarDraw && !chartStore.scatterDraw) yearSlider = <div/>;
        if (recordStore.firstYear === 0) yearSlider = <div/>;

        let legends = <Legends/>;
        if (!chartStore.barDraw && !chartStore.lineDraw && !chartStore.radarDraw && !chartStore.scatterDraw) legends = <div/>;

        return (
            <div className='chart-area'>

                {header}

                <div className='stage'>
                    {menu}
                    <ChartWrapper />
                    {yearSlider}
                    {legends}
                </div>

            </div>
        )

    }

}