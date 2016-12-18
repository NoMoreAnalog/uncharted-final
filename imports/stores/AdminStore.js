// Libs
import {Meteor} from 'meteor/meteor';
import {observable, computed, action} from 'mobx';
import * as _ from 'lodash';

// Files
import {Countries} from '../api/countries.js';
import {Indicators} from '../api/indicators.js';
import {Records} from '../api/records.js';
import {Flags} from '../api/flags.js';

export default class AdminStore {

    @observable countries = [];
    @observable flags = [];
    @observable indicators = [];
    @observable records = [];
    @observable adminDimmed = false;

    constructor() {

        this.handle1 = Meteor.subscribe('countries');
        this.handle2 = Meteor.subscribe('files.flags.all');
        this.handle3 = Meteor.subscribe('indicators');

        window.that = this;

        Tracker.autorun(() => {

            if (this.handle1.ready()) {
                this.countries.replace(Countries.find().fetch().map(country => new Country(country)));
            }

            if (this.handle2.ready()) {
                this.flags.replace(Flags.find().fetch());
            }

            if (this.handle3.ready()) {
                this.indicators.replace(Indicators.find().fetch().map(indicator => new Indicator(indicator)));
            }

        });

    }

    @action uploadFlag = (file, countryId, countryName) => {

        Flags.insert({
            file: file,
            meta: {
                'countryId': countryId,
                'countryName': countryName
            },
            onUploaded: (error, fileData) => {
                this.flags.replace(Flags.find().fetch());
                Meteor.call('countries.updateFlag', fileData._id, countryId, (err, res) => {
                    if (err) alert(err);
                });
            },
            onError: (error, fileData) => {
                console.log(error);
            }
        });

        // const reader = new FileReader();
        //
        // reader.onload = (fileLoadEvent) => {
        //
        //     let contents = fileLoadEvent.target.result;
        //
        //     contents = contents.split(',')[1];
        //
        //     Flags.insert({
        //         file: contents,
        //         isBase64: true,
        //         fileName: 'pic.png',
        //         type: 'image/png',
        //         meta: {
        //             'countryId': this.countryId,
        //             'countryName': this.countryName
        //         }
        //     });
        //
        // Meteor.call('flags.upload', contents, this.countryId, this.countryName, (err, res) => {
        //     if (err) {
        //         alert(err);
        //     } else {
        //         alert('Save successful');
        //         this._loadData();
        //     }
        // });
        //
        // };
        //
        // reader.readAsDataURL(files);

    }

    @action loadRecords = (countries, isos, indicators, codes, callback) => {

        let filters;

        filters = {
            countries: countries,
            isos: isos,
            indicators: indicators,
            codes: codes
        };

        this.records.replace([]);
        if (this.handle) this.handle.stop();

        if (_.size(filters.countries) === 0 &&
            _.size(filters.isos) === 0 &&
            _.size(filters.indicators) === 0 &&
            _.size(filters.codes) === 0) {
            return;
        }

        filters.countries = _.concat(filters.countries, filters.isos);
        filters.indicators = _.concat(filters.indicators, filters.codes);

        if (_.size(filters.countries) === 0) filters.countries = this.countries.map(c => c._id);
        if (_.size(filters.indicators) === 0) filters.indicators = this.indicators.map(c => c._id);

        this.handle = Meteor.subscribe('records.admin', filters, {
            onReady: () => {
                if (this.handle.ready()) {
                    let records = [];
                    Records.find().fetch().forEach(record => {
                        record.values.forEach(value => {
                            records.push(new Record(
                                record,
                                value,
                                this.countries.find(country => country._id === record.country).name,
                                this.indicators.find(indicator => indicator._id === record.indicator).name
                            ));
                        });
                    });
                    this.records.replace(records);
                    callback();
                }
            }
        });

    }

    @computed get countryNameSource() {
        let countryNames = [];
        this.countries.forEach((country) => {
            if (!country.name || country.delete) return;
            countryNames.push(country.name);
        });
        return countryNames;
    }

    @computed get countryNameOptions() {
        let countryNames = [];
        this.countries.forEach((country) => {
            if (!country.name || country.delete) return;
            countryNames.push({text: country.name, value: country._id});
        });
        return countryNames;
    }

    @computed get countryISOOptions() {
        let countryISOs = [];
        this.countries.forEach((country) => {
            if (!country.iso || country.delete) return;
            countryISOs.push({text: country.iso, value: country._id});
        });
        return countryISOs;
    }

    @computed get indicatorNameSource() {
        let indicatorNames = [];
        this.indicators.forEach((indicator) => {
            if (!indicator.name || indicator.delete) return;
            indicatorNames.push(indicator.name);
        });
        return indicatorNames;
    }

    @computed get indicatorNameOptions() {
        let indicatorNames = [];
        this.indicators.forEach((indicator) => {
            if (!indicator.name || indicator.delete) return;
            indicatorNames.push({text: indicator.name, value: indicator._id});
        });
        return indicatorNames;
    }

    @computed get indicatorCodeOptions() {
        let indicatorCodes = [];
        this.indicators.forEach((indicator) => {
            if (!indicator.code || indicator.delete) return;
            indicatorCodes.push({text: indicator.code, value: indicator._id});
        });
        return indicatorCodes;
    }

}

class Country {

    @observable active = false;
    @observable draw = false;

    _id = '';
    name = '';
    iso = '';
    color = '';
    createdAt = '';
    createdBy = '';
    changedAt = '';
    changedBy = '';
    delete = false;
    flagId = '';
    flagPath = '';

    constructor(country) {
        this._id = country._id;
        this.name = country.name;
        this.iso = country.iso;
        this.color = country.color;
        this.createdBy = country.createdBy;
        this.changedBy = country.changedBy;
        this.delete = country.delete || false;

        const flag = Flags.findOne({_id: country.flag});
        if (flag) {
            this.flagId = flag._id;
            this.flagPath = flag.link();
        }

        if (country.createdAt) this.createdAt = country.createdAt.toLocaleString();
        if (country.changedAt) this.changedAt = country.changedAt.toLocaleString();
    }

}

class Indicator {

    @observable active = false;
    @observable draw = false;

    _id = '';
    name = '';
    name_ar = '';
    code = '';
    notes = '';
    notes_ar = '';
    createdAt = '';
    createdBy = '';
    changedAt = '';
    changedBy = '';
    delete = false;

    constructor(indicator) {
        this._id = indicator._id;
        this.name = indicator.name;
        this.name_ar = indicator.name_ar;
        this.code = indicator.code;
        this.notes = indicator.notes;
        this.notes_ar = indicator.notes_ar;
        this.createdBy = indicator.createdBy;
        this.changedBy = indicator.changedBy;
        this.delete = indicator.delete || false;

        if (indicator.createdAt) this.createdAt = indicator.createdAt.toLocaleString();
        if (indicator.changedAt) this.changedAt = indicator.changedAt.toLocaleString();
    }

}

class Record {

    _id = '';
    countryId = '';
    countryName = '';
    indicatorId = '';
    indicatorName = '';
    year = 0;
    value = 0;
    createdAt = '';
    createdBy = '';
    changedAt = '';
    changedBy = '';
    delete = false;

    constructor(record, value, countryName, indicatorName) {
        this._id = record._id;
        this.countryId = record.country
        this.countryName = countryName
        this.indicatorId = record.indicator;
        this.indicatorName = indicatorName;
        this.year = value.year;
        this.value = value.value;
        this.createdBy = value.createdBy;
        this.changedBy = value.changedBy;
        this.delete = value.delete || false;

        if (value.createdAt) this.createdAt = value.createdAt.toLocaleString();
        if (value.changedAt) this.changedAt = value.changedAt.toLocaleString();
    }

}