import {extendObservable} from 'mobx';

import {Indicators} from '../api/indicators.js';

class IndicatorStore {

    // @observable indicators = [];
    // @observable active = [];
    // @observable filter = ''

    handle;

    constructor() {

        extendObservable(this, {
            indicators: [],
            activeIndicators: [],
            filter: ''
        });

        this.handle = Meteor.subscribe('indicators');
        Tracker.autorun(() => {
            if (this.handle.ready()) this.setIndicators(Indicators.find({}, {sort: {name: 1}}).fetch());
        });

    }

    setIndicators = (values) => {
        this.indicators.replace(values);
    }

    setActive = value => {
        this.activeIndicators.push(value);
    }

}

export default IndicatorStore;