// Libs
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Indicators = new Mongo.Collection('indicators');

if (Meteor.isServer) {

    Meteor.publish('indicators', function indicatorsPublication() {
        return Indicators.find();
    });

}

Meteor.methods({

    'indicators.save'(data) {

        for (var i = 0; i < data.length; i++) {

            let indicator;

            if (data[i]._id) indicator = Indicators.findOne({_id: data[i]._id});

            if (indicator) {
                Indicators.update(data[i]._id, {
                    $set: {
                        name: data[i].name,
                        name_ar: data[i].name_ar,
                        code: data[i].code,
                        notes: data[i].notes,
                        notes_ar: data[i].notes_ar,
                        changedAt: new Date(),
                        changedBy: Meteor.user().username,
                        delete: data[i].delete
                    }
                });
            } else {
                Indicators.insert({
                    name: data[i].name,
                    name_ar: data[i].name_ar,
                    code: data[i].code,
                    notes: data[i].notes,
                    notes_ar: data[i].notes_ar,
                    createdAt: new Date(),
                    createdBy: Meteor.user().username
                });
            }

        }

    }

});