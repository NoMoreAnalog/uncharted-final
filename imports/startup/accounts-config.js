import {Accounts} from 'meteor/accounts-base';

if (Meteor.isServer) {
    Accounts.config({
        passwordSignupFields: 'USERNAME_ONLY',
    });
}