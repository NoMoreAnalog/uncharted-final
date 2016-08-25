import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Indicators = new Mongo.Collection('indicators');

if (Meteor.isServer) {

    Meteor.publish('indicators', function indicatorsPublication() {
        return Indicators.find();
    });

}

Meteor.methods({

    'indicators.insert'() {

        Indicators.insert({
            createdAt: new Date(),
        });

    },

    'indicators.remove'(indicatorId) {

        check(indicatorId, String);

        const indicator = Indicators.findOne(indicatorId);
        Indicators.remove(indicator);

    }

});