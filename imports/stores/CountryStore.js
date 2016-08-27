import {extendObservable} from 'mobx';

import {Countries} from '../api/countries.js';

class CountryStore {

    constructor() {

        extendObservable(this, {
            countries: [],
            filter: ''
        });

        this.handle = Meteor.subscribe('countries');
        Tracker.autorun(() => {
            if (this.handle.ready()) this.setCountries(Countries.find({}, {sort: {name: 1}}).fetch());
        });

    }

    setCountries = values => {
        this.countries.replace(values);
    }

    setActive = value => {
        if (value.active == undefined) {
            value.active = true;
        } else {
            value.active = !value.active;
        }
    }

}

export default CountryStore;