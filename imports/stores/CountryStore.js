import {observable} from 'mobx';

import {Countries} from '../api/countries.js';

class CountryStore {

    @observable countries = [];
    @observable active = [];
    @observable filter = '';

    handle;

    constructor() {
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