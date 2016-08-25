import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';

import '../imports/startup/accounts-config.js';
import MainLayout from '../imports/ui/layouts/MainLayout.jsx';

Meteor.startup(() => {
    render(<MainLayout />, document.getElementById('render-target'));
});