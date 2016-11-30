import React, {PropTypes, Component} from 'react';
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

    constructor() {
        super();
        this._onAfterChange = this._onAfterChange.bind(this);
    }

    _onAfterChange(value) {
        const {recordStore} = {...this.props};
        if (value[0]) {
            recordStore.yearsToDraw.replace(value);
            recordStore.yearsToDrawSingle = recordStore.yearsToDraw[1];
        }
        else {
            recordStore.yearsToDraw.replace([recordStore.yearsToDraw[0], value]);
            recordStore.yearsToDrawSingle = value;
        }
    }

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
        if (chartStore.scatterDraw) {
            slider =
                <Slider
                    disabled={false}
                    vertical
                    min={recordStore.firstYear}
                    max={recordStore.lastYear}
                    step={1}
                    defaultValue={recordStore.lastYear}
                    onChange={this._onAfterChange}
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
                    defaultValue={[recordStore.firstYear, recordStore.lastYear]}
                    onAfterChange={this._onAfterChange}
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