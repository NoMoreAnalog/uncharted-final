import {extendObservable} from 'mobx';

import {Indicators} from '../api/indicators.js';

class Indicator {

    constructor(_id, name) {
        extendObservable(this, {
            _id: _id,
            name: name,
            active: false,
            type: 'indicator'
        });
    }

}

class IndicatorStore {

    constructor() {

        extendObservable(this, {
            indicators: [],
            filter: '',
            activeFilter: '',
            filteredIndicators: () => {
                var matchesFilter = new RegExp(this.filter, 'i');
                return this.indicators.filter(indicator => !this.filter || matchesFilter.test(indicator.name));
            },
            filteredActiveIndicators: () => {
                var matchesFilter = new RegExp(this.activeFilter, 'i');
                return this.indicators.filter(indicator => indicator.active === true && (!this.activeFilter || matchesFilter.test(indicator.name)));
            }
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

    setActive = value => {
        value.active = !value.active;
    }

}

export default IndicatorStore;