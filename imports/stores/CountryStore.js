import {extendObservable} from 'mobx';

import {Countries} from '../api/countries.js';

class Country {

    constructor(_id, name) {
        extendObservable(this, {
            _id: _id,
            name: name,
            active: false
        });
    }

}

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
        const countries = values.map(value => new Country(value._id, value.name));
        this.countries.replace(countries);
    }

    setActive = (value) => {
        value.active = !value.active;
    }

}

export default CountryStore;