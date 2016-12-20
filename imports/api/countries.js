// Libs
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

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

    'countries.updateFlag'(flagId, countryId) {

        if (!this.userId) {
            throw new Meteor.Error(
                403,
                'Error 403: Forbidden',
                'You do not have access to perform operation (countries.updateFlag)'
            );
        }

        check(flagId, String);
        check(countryId, String);

        Countries.update(countryId, {$set: {flag: flagId}});

    },

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
            year: Number,
            population: Number,
            delete: Boolean
        }]);

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
                    createdAt: new Date(),
                    createdBy: Meteor.user().username
                });
            }

        }

    }

});