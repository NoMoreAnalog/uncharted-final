import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';
import Slider from 'rc-slider';
import {Icon} from 'semantic-ui-react'
import * as _ from 'lodash';

class CustomHandle extends Component {

    render() {

        const {offset, value} = {...this.props};

        const handleStyle = {
            marginLeft: -50,
            position: 'absolute',
            cursor: 'pointer',
            bottom: offset + '%',
            transform: 'translate(10px, 50%)'
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
@observer(['recordStore', 'store'])
export default class YearSlider extends Component {

    constructor() {
        super();
        this._log = this._log.bind(this);
    }

    _log(value) {
        const {recordStore} = {...this.props};
        recordStore.yearsToDraw.replace(value);
    }

    render() {

        const {store, recordStore} = {...this.props};

        if (!store.barDraw && !store.lineDraw && !store.radarDraw && !store.scatterDraw) return <div/>;
        if (recordStore.firstYear === 0) return <div/>;

        const sliderStyle = {
            height: 300,
            width: 30,
            marginLeft: 40,
            marginTop: -350
        };

        const yearStyle = {
            top: -370,
            position: 'relative',
            fontWeight: 'bold'
        };

        return (
            <div>
                <div style={yearStyle}>Years:</div>
                <div style={sliderStyle}>
                    <Slider
                        disabled={false}
                        range
                        vertical
                        min={recordStore.firstYear}
                        max={recordStore.lastYear}
                        step={1}
                        defaultValue={[recordStore.firstYear, recordStore.lastYear]}
                        onAfterChange={this._log}
                        handle={<CustomHandle/>}
                    />
                </div>
            </div>
        )

    }

}