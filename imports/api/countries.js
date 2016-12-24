// Libs
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import * as _ from 'lodash';

export const Countries = new Mongo.Collection('countries');

if (Meteor.isServer) {

    Countries.deny({
        insert() {
            return true;
        },
        update() {
            return true;
        },
        remove() {
            return true;
        },
    });

    Meteor.publish('countries', function countriesPublication() {
        return Countries.find();
    });

}

Meteor.methods({

    'countries.savePopulation'(data) {

        if (!this.userId) {
            throw new Meteor.Error(
                403,
                'Error 403: Forbidden',
                'You do not have access to perform operation (countries.savePopulation)'
            );
        }

        check(data, [{
            _id: String,
            populations: [{
                year: Number,
                value: Number,
                delete: Match.Maybe(Boolean)
            }]
        }]);

        for (var i = 0; i < data.length; i++) {

            const country = Countries.findOne({_id: data[i]._id});

            if (country) {

                for (var j = 0; j < data[i].populations.length; j++) {

                    const index = _.findIndex(country.populations, {'year': data[i].populations[j].year});

                    if (index > -1) {
                        country.populations[index] = {
                            year: data[i].populations[j].year,
                            value: data[i].populations[j].value,
                            createdAt: country.populations[index].createdAt,
                            createdBy: country.populations[index].createdBy,
                            changedAt: new Date(),
                            changedBy: Meteor.user().username,
                            delete: data[i].populations[j].delete || false
                        };
                    } else {
                        if (!_.isArrayLike(country.populations)) country.populations = [];
                        country.populations.push({
                            year: data[i].populations[j].year,
                            value: data[i].populations[j].value,
                            createdAt: new Date(),
                            createdBy: Meteor.user().username
                        });
                    }

                }

                Countries.update(country._id, {$set: {populations: country.populations}});

            }

        }

    },

    'countries.saveOverview'(data) {

        if (!this.userId) {
            throw new Meteor.Error(
                403,
                'Error 403: Forbidden',
                'You do not have access to perform operation (countries.saveOverview)'
            );
        }

        check(data, [{
            _id: String,
            name: String,
            iso: String,
            color: String,
            flagId: String,
            delete: Boolean
        }]);

        for (var i = 0; i < data.length; i++) {

            let country;

            if (data[i]._id) country = Countries.findOne({_id: data[i]._id});

            if (country) {
                Countries.update(data[i]._id, {
                    $set: {
                        name: data[i].name,
                        iso: data[i].iso,
                        color: data[i].color,
                        flag: data[i].flagId,
                        createdAt: country.createdAt,
                        createdBy: country.createdBy,
                        changedAt: new Date(),
                        changedBy: Meteor.user().username,
                        delete: data[i].delete
                    }
                });
            } else {
                Countries.insert({
                    name: data[i].name,
                    iso: data[i].iso,
                    color: data[i].color,
                    flag: data[i].flagId,
                    createdAt: new Date(),
                    createdBy: Meteor.user().username
                });
            }

        }

    }

});