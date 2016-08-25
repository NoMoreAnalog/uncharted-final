import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Records = new Mongo.Collection('records');

if (Meteor.isServer) {

    Meteor.publish('records', function recordsPublication() {
        return Records.find();
    });

}

Meteor.methods({

    'records.insert'() {

        Records.insert({
            createdAt: new Date(),
        });

    },

    'records.remove'(recordId) {

        check(recordId, String);

        const record = Records.findOne(recordId);
        Records.remove(record);

    }

});