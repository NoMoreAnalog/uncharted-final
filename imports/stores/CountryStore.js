import {computed, observable} from 'mobx';

import {Countries} from '../api/countries.js';

class Country {

    @observable active = false;
    @observable draw = false;

    _id = '';
    name = name;
    type = 'country';

    constructor(_id, name) {
        this._id = _id;
        this.name = name;
    }

}

class CountryStore {

    @observable countries = [];
    @observable filter = '';

    type = 'country';

    @computed get filteredCountries() {
        var matchesFilter = new RegExp(this.filter, 'i');
        return this.countries.filter(country => !this.filter || matchesFilter.test(country.name));
    };

    @computed get activeCountries() {
        return this.countries.filter(country => country.active);
    };

    constructor() {

        this.handle = Meteor.subscribe('countries');

        Tracker.autorun(() => {
            if (this.handle.ready()) this.setCountries(Countries.find({delete: false}, {sort: {name: 1}}).fetch());
        });

    }

    setCountries = values => {
        const countries = values.map(value => new Country(value._id, value.name));
        this.countries.replace(countries);
    }

    setActive = value => {
        value.active = !value.active;
        value.draw = value.active;
    }

    setDraw = value => {
        value.draw = !value.draw;
    }

}

export default CountryStore;