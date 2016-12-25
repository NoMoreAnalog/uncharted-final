import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Slider from 'rc-slider';
import {Icon} from 'semantic-ui-react'
import * as _ from 'lodash';

class CustomHandle extends Component {

    render() {

        const {offset, value} = {...this.props};

        const handleStyle = {
            marginLeft: -40,
            position: 'absolute',
            cursor: 'pointer',
            bottom: offset - 2 + '%',
            width: 100,
            color: '#636363'
        };

        return (
            <div style={handleStyle}>
                {value}&nbsp;<Icon name='circle' size='small'/>
            </div>
        )

    }

}

CustomHandle.propTypes = {
    value: React.PropTypes.any,
    offset: React.PropTypes.number,
};

// YearSlider component - Slider to filter years
@observer(['recordStore', 'chartStore'])
export default class YearSlider extends Component {

    render() {

        const {recordStore, chartStore} = {...this.props};

        const sliderStyle = {
            height: 300,
            width: 30,
            marginLeft: 40,
            marginTop: -350,
        };

        const yearStyle = {
            top: -370,
            position: 'relative',
            fontWeight: 'bold',
            color: '#636363',
            display: 'inline'
        };

        let slider;
        if (chartStore.scatterDraw || chartStore.radarDraw) {
            slider =
                <Slider
                    disabled={false}
                    vertical
                    min={recordStore.firstYear}
                    max={recordStore.lastYear}
                    step={1}
                    defaultValue={recordStore.yearsToDraw[1]}
                    value={recordStore.yearsToDraw[1]}
                    onChange={(value) => {
                        if (_.isArrayLike(value)) {
                            // Happens when the draw value switches because of (de)selecting indicators
                            recordStore.yearsToDraw[1] = value[1];
                        } else {
                            recordStore.yearsToDraw[1] = value;
                        }
                    }}
                    handle={<CustomHandle/>}
                />;
        } else {
            slider =
                <Slider
                    disabled={false}
                    range
                    vertical
                    min={recordStore.firstYear}
                    max={recordStore.lastYear}
                    step={1}
                    value={[recordStore.yearsToDraw[0], recordStore.yearsToDraw[1]]}
                    onChange={(value) => {
                        recordStore.yearsToDraw[0] = value[0];
                        recordStore.yearsToDraw[1] = value[1];
                    }}
                    handle={<CustomHandle/>}
                />;
        }

        return (
            <div>
                <div style={yearStyle}>Years:</div>
                <div style={sliderStyle}>{slider}</div>
            </div>
        )

    }

}