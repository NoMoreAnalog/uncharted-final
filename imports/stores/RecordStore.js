import {computed, observable} from 'mobx';

import {Records} from '../api/records.js';
import {Countries} from '../api/countries.js';
import {Indicators} from '../api/indicators.js';

class RecordStore {

    @observable records = [];

    constructor() {
        this.handle = Meteor.subscribe('records');

        Tracker.autorun(() => {
            if (this.handle.ready()) Records.find({}, {}).fetch();
        });
    }

    getRecords(countryIds, indicatorIds) {
        const values = Records.find({
            $and: [
                {country: {$in: countryIds}},
                {indicator: {$in: indicatorIds}}
            ]
        }, {}).fetch();
        let records = [];
        values.forEach(record => {
            record.values.forEach(value => {
                records.push(new Record(
                    record,
                    value,
                    Countries.findOne({_id: record.country}).name,
                    Countries.findOne({_id: record.country}).color,
                    Indicators.findOne({_id: record.indicator}).name
                ));
            });
        });
        return records;
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

    constructor(record, value, countryName, countryColor, indicatorName) {
        this._id = record._id;
        this.countryId = record.country
        this.countryName = countryName
        this.countryColor = countryColor
        this.indicatorId = record.indicator;
        this.indicatorName = indicatorName;
        this.year = Number.parseInt(value.year)
        this.value = Number.parseFloat(value.value)
    }

}

export default RecordStore;