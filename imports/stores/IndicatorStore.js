import {extendObservable} from 'mobx';

import {Indicators} from '../api/indicators.js';

class IndicatorStore {

    // @observable indicators = [];
    // @observable active = [];
    // @observable filter = '';

    constructor() {

        extendObservable(this, {
            indicators: [],
            active: [],
            filter: ''
        });

        this.handle = Meteor.subscribe('indicators');
        Tracker.autorun(() => {
            if (this.handle.ready()) this.setIndicators(Indicators.find({}, {sort: {name: 1}}).fetch());
        });

    }

    setIndicators(values) {
        this.indicators = values;
    }

    setActive(value) {
        this.active.push(value);
    }

}

export default IndicatorStore;