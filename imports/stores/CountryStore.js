import {computed, extendObservable} from 'mobx';

import {Countries} from '../api/countries.js';

class Country {

    constructor(_id, name) {
        extendObservable(this, {
            _id: _id,
            name: name,
            active: false,
            type: 'country'
        });
    }

}

class CountryStore {

    constructor() {

        extendObservable(this, {
            countries: [],
            filter: '',
            filteredCountries: () => {
                var matchesFilter = new RegExp(this.filter, 'i');
                return this.countries.filter(country => !this.filter || matchesFilter.test(country.name));
            }
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