import React from 'react';
import {render} from 'react-dom';
import {Meteor} from 'meteor/meteor';

import '../imports/startup/client/'

import CountryStore from '../imports/stores/CountryStore.js';
import IndicatorStore from '../imports/stores/IndicatorStore.js';
import Store from '../imports/stores/store.js';
import MainLayout from '../imports/ui/layouts/MainLayout.jsx';

const countryStore = window.countryStore = new CountryStore();
const indicatorStore = window.indicatorStore = new IndicatorStore();
const store = window.store = new Store();

Meteor.startup(() => {
    render(
        <MainLayout
            countryStore={countryStore}
            indicatorStore={indicatorStore}
            store={store}
        />, document.getElementById('render-target'));
});