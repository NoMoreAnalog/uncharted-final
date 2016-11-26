import {computed, observable} from 'mobx';

import {Countries} from '../api/countries.js';

class Country {

    @observable active = false;
    @observable draw = false;

    _id = '';
    name = name;
    type = 'country';
    color = '';

    constructor(_id, name, color) {
        this._id = _id;
        this.name = name;
        this.color = '#' + color;
    }

}

export default class CountryStore {

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

    @computed get countriesToDraw() {
        return this.countries.filter(country => country.draw);
    };

    constructor() {

        this.handle = Meteor.subscribe('countries');

        Tracker.autorun(() => {
            if (this.handle.ready()) this.setCountries(Countries.find({delete: false}, {sort: {name: 1}}).fetch());
        });

    }

    setCountries = values => {
        const countries = values.map(value => new Country(value._id, value.name, value.color));
        this.countries.replace(countries);
    }

    setActive = value => {
        value.active = !value.active;
        value.draw = value.active;
        recordStore.setYears();
    }

    setDraw = value => {
        value.draw = !value.draw;
    }

}