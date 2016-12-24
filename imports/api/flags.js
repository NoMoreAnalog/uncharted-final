// Libs
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {FilesCollection} from 'meteor/ostrio:files';

export const Flags = new FilesCollection({
    // storagePath: process.env.NODE_ENV === 'development' ? '/data/Meteor/uploads/' : '',
    // downloadRoute: process.env.NODE_ENV === 'development' ? '/files/flags': '',
    collectionName: 'flags',
    allowClientCode: false, // Disallow remove files from Client
    onBeforeUpload: function (file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        } else {
            return 'Please upload image, with size equal or less than 10MB';
        }
    }
});

if (Meteor.isServer) {

    Meteor.publish('files.flags.all', function flagsPublication() {
        return Flags.find().cursor;
    });

}

Meteor.methods({

    'flags.upload'(contents, countryId, countryName) {

        if (!this.userId) {
            throw new Meteor.Error(
                403,
                'Error 403: Forbidden',
                'You do not have access to perform operation (flags.upload)'
            );
        }

        check(contents, String);
        check(countryId, String);
        check(countryName, Object);

        contents = contents.split(',')[1];

        Flags.insert({
            file: contents,
            isBase64: true,
            fileName: 'pic.png',
            type: 'image/png',
            meta: {
                'countryId': countryId,
                'countryName': countryName
            }
        });

    }

});