import {extendObservable} from 'mobx';

import {Countries} from '../api/countries.js';

class CountryStore {

    // @observable indicators = [];
    // @observable active = [];
    // @observable filter = '';

    constructor() {

        extendObservable(this, {
            countries: [],
            active: [],
            filter: ''
        });

        this.handle = Meteor.subscribe('countries');
        Tracker.autorun(() => {
            if (this.handle.ready()) this.setCountries(Countries.find({}, {sort: {name: 1}}).fetch());
        });
    }

    setCountries(values) {
        this.countries = values;
    }

    setActive(value) {
        this.active.push(value);
    }

}

export default CountryStore;