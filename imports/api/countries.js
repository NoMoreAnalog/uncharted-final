import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Countries = new Mongo.Collection('countries');

if (Meteor.isServer) {

    Meteor.publish('countries', function countriesPublication() {
        return Countries.find();
    });

}

Meteor.methods({

    'countries.insert'() {

        Countries.insert({
            createdAt: new Date(),
        });

    },

    'countries.remove'(countryId) {

        check(countryId, String);

        const country = Countries.findOne(countryId);
        Countries.remove(country);

    }

});