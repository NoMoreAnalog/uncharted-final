import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Header} from 'semantic-ui-react';

import ChartWrapper from './ChartWrapper.jsx';
import Menu from './Menu.jsx';
import YearSlider from './YearSlider.jsx';
import Legends from './legend/Legends.jsx';

// ChartArea component - Area for chart and chart information
@observer(['chartStore', 'recordStore', 'countryStore'])
export default class ChartArea extends Component {

    render() {

        const {chartStore, recordStore} = {...this.props};

        const content = chartStore.chartTitle2 ?
            <div className='content'>
                {chartStore.chartTitle}
                <span style={{color: '#0faec6'}}> VS </span>
                {chartStore.chartTitle2}
                {chartStore.chartTitle ? <hr/> : ''}
            </div> :
            <div className='content'>
                {chartStore.chartTitle}
                {chartStore.chartTitle ? <hr/> : ''}
            </div>;

        let header = <Header as='h1' className='title' style={{marginBottom: 0}}>{content}</Header>;
        let menu = <Menu/>;
        let yearSlider = <YearSlider/>;
        let legends = <Legends/>;

        if (!chartStore.barDraw && !chartStore.lineDraw && !chartStore.radarDraw && !chartStore.scatterDraw)
            menu = <div/>;

        if (!chartStore.barDraw && !chartStore.lineDraw && !chartStore.radarDraw && !chartStore.scatterDraw)
            yearSlider = <div/>;

        if (recordStore.firstYear === 0)
            yearSlider = <div/>;

        if (!chartStore.barDraw && !chartStore.lineDraw && !chartStore.radarDraw && !chartStore.scatterDraw)
            legends = <div/>;

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