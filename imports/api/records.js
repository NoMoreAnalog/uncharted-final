// Libs
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import * as _ from 'lodash';

// Exports
export const Records = new Mongo.Collection('records');

if (Meteor.isServer) {

    Meteor.publish('records', function recordsPublication(filters) {

        if (!filters || !filters.countries || !filters.indicators) return;

        return Records.find({
            $and: [
                {country: {$in: filters.countries}},
                {indicator: {$in: filters.indicators}}
            ]
        });

    });

    Meteor.publish('records.admin', function recordsPublication(filters) {

        if (!filters) return null;

        if (_.size(filters.countries) > 0 && _.size(filters.indicators) > 0) {
            return Records.find({
                $and: [
                    {country: {$in: filters.countries}},
                    {indicator: {$in: filters.indicators}},
                ]
            });
        }

    });

}

Meteor.methods({

    'records.save'(data) {

        for (var i = 0; i < data.length; i++) {

            let values = [];
            let record;

            if (data[i]._id) record = Records.findOne({country: data[i].country, indicator: data[i].indicator});

            if (record) {

                for (var j = 0; j < data[i].values.length; j++) {
                    values.push({
                        year: data[i].values[j].year,
                        value: data[i].values[j].value,
                        changedAt: new Date(),
                        delete: data[i].values[j].delete || false
                    });
                }

                Records.update(data[i]._id, {
                    $set: {
                        country: data[i].country,
                        indicator: data[i].indicator,
                        values: values
                    }
                });

            } else {

                for (var j = 0; j < data[i].values.length; j++) {
                    values.push({
                        year: data[i].values[j].year,
                        value: data[i].values[j].value,
                        createdAt: new Date()
                    });
                }

                Records.insert({
                    country: data[i].country,
                    indicator: data[i].indicator,
                    values: values
                });

            }

        }

    }

});