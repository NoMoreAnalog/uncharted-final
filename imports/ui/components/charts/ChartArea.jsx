import React, {Component} from 'react';
import {observer} from 'mobx-react';

import ChartWrapper from './ChartWrapper.jsx';
import Menu from './Menu.jsx';
import YearSlider from './YearSlider.jsx';
import Legends from './legend/Legends.jsx';

// ChartArea component - Area for chart and chart information
@observer(['countryStore', 'indicatorStore', 'store', 'recordStore'])
export default class ChartArea extends Component {

    render() {

        const {store, recordStore} = {...this.props};

        let header =
            <h1 className="ui header title">
                <div className="content">
                    {store.chartTitle}
                    <hr/>
                </div>
            </h1>;
        if (!store.chartTitle) header = <div/>

        let menu = <Menu/>;
        if (!store.barDraw && !store.lineDraw && !store.radarDraw && !store.scatterDraw) menu = <div/>;

        let yearSlider = <YearSlider/>;
        if (!store.barDraw && !store.lineDraw && !store.radarDraw && !store.scatterDraw) yearSlider = <div/>;
        if (recordStore.firstYear === 0) yearSlider = <div/>;

        let legends = <Legends/>;
        if (!store.barDraw && !store.lineDraw && !store.radarDraw && !store.scatterDraw) legends = <div/>;

        return (
            <div className="chart-area">

                {header}

                <div className="stage">
                    {menu}
                    <ChartWrapper />
                    {yearSlider}
                    {legends}
                </div>

            </div>
        )

    }

}