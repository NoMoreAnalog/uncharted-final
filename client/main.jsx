import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';

import '../imports/startup/accounts-config.js';

import CountryStore from '../imports/stores/CountryStore.js';
import IndicatorStore from '../imports/stores/IndicatorStore.js';
import UIStore from '../imports/stores/UIStore.js';
import MainLayout from '../imports/ui/layouts/MainLayout.jsx';

const countryStore = new CountryStore();
const indicatorStore = new IndicatorStore();
const uiStore = new UIStore();

Meteor.startup(() => {
    render(<MainLayout
        countryStore={countryStore}
        indicatorStore={indicatorStore}
        uiStore={uiStore}
    />, document.getElementById('render-target'));
});