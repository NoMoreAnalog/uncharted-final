import {computed, observable} from 'mobx';

import {Indicators} from '../api/indicators.js';

class Indicator {

    @observable active = false;
    @observable draw = false;

    _id = '';
    name = name;
    type = 'indicator';

    constructor(_id, name) {
        this._id = _id;
        this.name = name;
    }

}

class IndicatorStore {

    @observable indicators = [];
    @observable filter = '';
    @observable activeFilter = '';

    type = 'indicator';

    @computed get filteredIndicators() {
        var matchesFilter = new RegExp(this.filter, 'i');
        return this.indicators.filter(indicator => !this.filter || matchesFilter.test(indicator.name));
    };

    @computed get activeIndicators() {
        return this.indicators.filter(indicator => indicator.active);
    };

    @computed get filteredActiveIndicators() {
        var matchesFilter = new RegExp(this.activeFilter, 'i');
        return this.indicators.filter(indicator => indicator.active === true && (!this.activeFilter || matchesFilter.test(indicator.name)));
    };

    constructor() {

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
        value.draw = value.active;
    }

    setDraw = value => {
        value.draw = !value.draw;
    }

}

export default IndicatorStore;