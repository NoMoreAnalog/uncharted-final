// Libs
import React, {Component} from 'react';
import {Image} from 'semantic-ui-react';
import {observer} from 'mobx-react';

// Steps component - tutorial steps initially displayed to the user
@observer(['store', 'countryStore', 'indicatorStore'])
export default class Steps extends Component {

    render() {

        const {store, countryStore, indicatorStore} = this.props;

        const imageStyle = {
            height: 150,
            position: 'fixed'
        };

        const stepOneStyle = Object.assign({top: store.step1Pos.top, right: store.step1Pos.right}, imageStyle);
        const stepTwoStyle = Object.assign({top: store.step2Pos.top, right: store.step2Pos.right}, imageStyle);
        const stepThreeStyle = Object.assign({top: store.step3Pos.top, right: store.step3Pos.right + 100}, imageStyle);

        const imageOne = countryStore.activeCountries.length ?
            <div/> : <Image src='1_step.png' style={stepOneStyle}/>;

        const imageTwo = indicatorStore.activeIndicators.length ?
            <div/> : <Image src='2_step.png' style={stepTwoStyle}/>;

        const imageThree = store.barDraw || store.lineDraw || store.scatterDraw || store.radarDraw ?
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