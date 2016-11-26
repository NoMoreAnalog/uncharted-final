import React from 'react';
import {render} from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Provider} from 'mobx-react';

// Files
import '../imports/startup/client/index';

import Routes from '../imports/startup/client/Routes';
import CountryStore from '../imports/stores/CountryStore.js';
import IndicatorStore from '../imports/stores/IndicatorStore.js';
import RecordStore from '../imports/stores/RecordStore.js';
import Store from '../imports/stores/Store.js';
import AdminStore from '../imports/stores/AdminStore.js';

// Globals
const countryStore = window.countryStore = new CountryStore();
const indicatorStore = window.indicatorStore = new IndicatorStore();
const recordStore = window.recordStore = new RecordStore();
const store = window.store = new Store();
const adminStore = window.recordStore = new AdminStore();

Meteor.startup(() => {
    render(
        <Provider
            countryStore={countryStore}
            indicatorStore={indicatorStore}
            recordStore={recordStore}
            store={store}
            adminStore={adminStore}>
            {Routes}
        </Provider>,
        document.getElementById('app'));
});