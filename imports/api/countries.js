// Libs
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const Countries = new Mongo.Collection('countries');

if (Meteor.isServer) {

    Meteor.publish('countries', function countriesPublication() {
        return Countries.find();
    });

}

Meteor.methods({

    'countries.save'(data) {

        for (var i = 0; i < data.length; i++) {

            let country;

            if (data[i]._id) country = Countries.findOne({_id: data[i]._id});

            if (country) {
                Countries.update(data[i]._id, {
                    $set: {
                        name: data[i].name,
                        iso: data[i].iso,
                        color: data[i].color,
                        changedAt: new Date(),
                        delete: data[i].delete
                    }
                });
            } else {
                Countries.insert({
                    name: data[i].name,
                    iso: data[i].iso,
                    color: data[i].color,
                    createdAt: new Date()
                });
            }

        }

    }

});