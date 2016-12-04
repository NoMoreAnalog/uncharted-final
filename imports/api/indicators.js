// Libs
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Indicators = new Mongo.Collection('indicators');

if (Meteor.isServer) {

    Indicators.deny({
        insert() { return true; },
        update() { return true; },
        remove() { return true; },
    });

    Meteor.publish('indicators', function indicatorsPublication() {
        return Indicators.find();
    });

}

Meteor.methods({

    'indicators.save'(data) {

        if (!this.userId) {
            throw new Meteor.Error(
                403,
                'Error 403: Forbidden',
                'You do not have access to perform operation (indicators.save)'
            );
        }

        check(data, [{
            _id: String,
            name: String,
            name_ar: String,
            code: Match.Maybe(String),
            notes: Match.Maybe(String),
            notes_ar: Match.Maybe(String),
            delete: Match.Maybe(Boolean)
        }]);

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
                        createdAt: indicator.createdAt,
                        createdBy: indicator.createdBy,
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