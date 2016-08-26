import {observable} from 'mobx';

import {Indicators} from '../api/indicators.js';

class IndicatorStore {

    @observable indicators = [];
    @observable active = [];
    @observable filter = '';

    handle;

    constructor() {
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