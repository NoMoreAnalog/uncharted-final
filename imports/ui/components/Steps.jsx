// Libs
import React, {Component} from 'react';
import {Image} from 'semantic-ui-react';
import {observer} from 'mobx-react';

// Steps component - tutorial steps initially displayed to the user
@observer(['chartStore', 'countryStore', 'indicatorStore'])
export default class Steps extends Component {

    render() {

        const {chartStore, countryStore, indicatorStore} = this.props;

        const imageStyle = {
            height: 150,
            position: 'fixed'
        };

        const stepOneStyle = Object.assign({top: chartStore.step1Pos.top, right: chartStore.step1Pos.right}, imageStyle);
        const stepTwoStyle = Object.assign({top: chartStore.step2Pos.top, right: chartStore.step2Pos.right}, imageStyle);
        const stepThreeStyle = Object.assign({top: chartStore.step3Pos.top, right: chartStore.step3Pos.right + 100}, imageStyle);

        const imageOne = countryStore.activeCountries.length ?
            <div/> : <Image src='1_step.png' style={stepOneStyle}/>;

        const imageTwo = indicatorStore.activeIndicators.length ?
            <div/> : <Image src='2_step.png' style={stepTwoStyle}/>;

        const imageThree = chartStore.barDraw || chartStore.lineDraw || chartStore.scatterDraw || chartStore.radarDraw ?
            <div/> : <Image src='3_step.png' style={stepThreeStyle}/>;

        return (
            <div className='steps'>
                {imageOne}
                {imageTwo}
                {imageThree}
            </div>
        )

    }

}