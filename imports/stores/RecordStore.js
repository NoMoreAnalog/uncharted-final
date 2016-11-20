import {computed, observable} from 'mobx';
import * as _ from 'lodash';

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

    @computed get recordsToDraw() {

        const activeCountries = countryStore.activeCountries,
            activeIndicators = indicatorStore.activeIndicators;

        const values = Records.find({
            $and: [
                {country: {$in: activeCountries.map(c => c._id)}},
                {indicator: {$in: activeIndicators.map(c => c._id)}}
            ]
        }, {}).fetch();

        const records = [];
        values.forEach(record => {
            record.values.forEach(value => {
                records.push(new Record(
                    record,
                    value,
                    Countries.findOne({_id: record.country}).name,
                    Countries.findOne({_id: record.country}).color,
                    Indicators.findOne({_id: record.indicator}).name,
                    Indicators.findOne({_id: record.indicator}).code
                ));
            });
        });

        const sortedRecords = _.sortBy(records, ['year', 'countryName', 'indicatorName']);

        // Get colors

        const usedIndicatorIds = _.keys(_.groupBy(sortedRecords, 'indicatorId'));

        sortedRecords.forEach(record => {
            const index = _.findIndex(usedIndicatorIds, id => id === record.indicatorId)
            const color = this._shadeColor2(record.countryColor, index / usedIndicatorIds.length);
            record.countryColor = color;
        });

        // Remove the records we are not drawing, we initially use all active active indicators so we can
        // be consistent with the colors when the user removes one via the legend

        const filteredRecords = _.filter(sortedRecords, record => {
            return (
                _.find(countryStore.countriesToDraw, {'_id': record.countryId}) &&
                _.find(indicatorStore.indicatorsToDraw, {'_id': record.indicatorId})
            );
        });

        return filteredRecords;
    }

    _shadeColor2(color, percent) {

        var f = parseInt(color.slice(1), 16),
            t = percent < 0 ? 0 : 255,
            p = percent < 0 ? percent * -1 : percent,
            R = f >> 16,
            G = f >> 8 & 0x00FF,
            B = f & 0x0000FF;

        return "#" +
            (0x1000000 +
            (Math.round((t - R) * p) + R) * 0x10000 +
            (Math.round((t - G) * p) + G) * 0x100 +
            (Math.round((t - B) * p) + B))
                .toString(16).slice(1);

    }

}

class Record {

    _id = '';
    countryId = '';
    countryName = '';
    indicatorId = '';
    indicatorName = '';
    indicatorCode = '';
    year = 0;
    value = 0;

    constructor(record, value, countryName, countryColor, indicatorName, indicatorCode) {
        this._id = record._id;
        this.countryId = record.country
        this.countryName = countryName
        this.countryColor = '#' + countryColor
        this.indicatorId = record.indicator;
        this.indicatorName = indicatorName;
        this.indicatorCode = indicatorCode;
        this.year = Number.parseInt(value.year)
        this.value = Number.parseFloat(value.value)
    }

}

export default RecordStore;