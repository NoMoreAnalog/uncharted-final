import {extendObservable} from 'mobx';

import {Indicators} from '../api/indicators.js';

class Indicator {

    constructor(_id, name) {
        extendObservable(this, {
            _id: _id,
            name: name,
            active: false
        });
    }

}

class IndicatorStore {

    constructor() {

        extendObservable(this, {
            indicators: [],
            activeIndicatorsOpen: false,
            filter: ''
        });

        this.handle = Meteor.subscribe('indicators');
        Tracker.autorun(() => {
            if (this.handle.ready()) this.setIndicators(Indicators.find({}, {sort: {name: 1}}).fetch());
        });

    }

    setIndicators = values => {
        const indicators = values.map(value => new Indicator(value._id, value.name));
        this.indicators.replace(indicators);
    }

    setActive = (value) => {
        value.active = !value.active;
    }

    toggleActiveIndicators = () => {
        this.activeIndicatorsOpen = !this.activeIndicatorsOpen;
    }

}

export default IndicatorStore;