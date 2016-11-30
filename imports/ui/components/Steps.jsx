// Libs
import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';

// Steps component - tutorial steps initially displayed to the user
@observer(['chartStore', 'countryStore', 'indicatorStore'])
export default class Steps extends Component {

    render() {

        const {chartStore, countryStore, indicatorStore, number} = this.props;

        const style = {
            position: 'absolute',
            float: 'left'
        };

        let imageStyle;

        switch (number) {

            case 1:

                imageStyle = {marginTop: 100, marginLeft: -350, height: 150, width: 375};
                return countryStore.activeCountries.length ?
                    <div/> :
                    <div style={style}><img src='1_step.png' style={imageStyle}/></div>;

            case 2:

                imageStyle = {marginTop: 100, marginLeft: -350, height: 150, width: 375};
                return indicatorStore.activeIndicators.length ?
                    <div/> :
                    <div style={style}><img src='2_step.png' style={imageStyle}/></div>;

            case 3:

                imageStyle = {marginTop: 50, marginRight: 200, height: 150, width: 375};
                return chartStore.barDraw || chartStore.lineDraw || chartStore.scatterDraw || chartStore.radarDraw ?
                    <div/> :
                    <div style={style}><img src='3_step.png' style={imageStyle}/></div>;

            default:
                return <div/>

        }

    }

}

Steps.wrappedComponent.propTypes = {
    number: PropTypes.number
};

Steps.wrappedComponent.defaultProps = {
    number: 0
};