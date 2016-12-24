// Libs
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, Icon} from 'semantic-ui-react';
import Handsontable from 'handsontable/dist/handsontable.full.min.js';
import * as _ from 'lodash';

@observer(['adminStore'])
export default class CountriesPopulations extends Component {

    settings;

    componentDidMount() {

        const {adminStore} = {...this.props};

        adminStore.countriesComponent = 'CountriesPopulations';

        this.settings = {
            data: adminStore.countriesPopulations.peek(),
            columns: [
                {data: '_id', type: 'text', readOnly: true},
                {
                    data: 'name', type: 'dropdown',
                    source: (query, callback) => {
                        callback(adminStore.countryNameSource);
                    },
                    validator: this._validator
                },
                {data: 'year', type: 'dropdown', source: this._yearSource(), validator: this._validator},
                {data: 'value', validator: this._validator},
                {data: 'createdAt', type: 'text', readOnly: true},
                {data: 'createdBy', type: 'text', readOnly: true},
                {data: 'changedAt', type: 'text', readOnly: true},
                {data: 'changedBy', type: 'text', readOnly: true},
                {data: 'delete', type: 'checkbox', className: 'htCenter htMiddle'}
            ],
            colHeaders: ['ID', 'Country', 'Year', 'Population', 'Created At', 'Created By', 'Changed At', 'Changed By', 'Delete?'],
            columnSorting: true,
            manualColumnResize: true,
            manualColumnMove: true,
            rowHeaders: true,
            sortIndicator: true,
            contextMenu: ['undo', 'redo'],
            afterChange: (changes, source) => {
                if (!changes || source !== 'edit') return;

                for (var i = 0; i < changes.length; i++) {

                    const row = changes[i][0];
                    const prop = changes[i][1];
                    const oldValue = changes[i][2];
                    const newValue = changes[i][3];

                    if (prop == 'delete' && typeof newValue != 'boolean') {
                        adminStore.table.setDataAtRowProp(row, prop, false);
                    }

                    adminStore.countriesPopulations[row].changed = true;
                }
            },
            cells: function (row, col, prop) {
                if (prop === 'name' || prop === 'year' || prop === 'value') {
                    return {readOnly: this.instance.getDataAtRowProp(row, 'delete')};
                }
            },
        };

        adminStore.table = new Handsontable(this.hot, this.settings);

    }

    componentWillUnmount() {
        adminStore.clearCountriesData();
    }

    _yearSource() {
        return [
            1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
            2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017
        ];
    }

    _addCountry = () => {
        const {adminStore} = {...this.props};
        adminStore.countriesPopulations.replace(
            adminStore.countriesPopulations.peek().concat([{'new': true}])
        );
    }

    _validator(value, callback) {
        callback(true);
        this.instance.removeCellMeta(this.row, this.col, 'className');
        this.instance.render();
    }

    _saveChanges = () => {

        const {adminStore} = {...this.props};

        if (!adminStore.table || !_.find(adminStore.countriesPopulations.peek(), 'changed')) return;

        let error = false;
        const data = adminStore.countriesPopulations;

        for (var i = 0; i < data.length; i++) {

            if (!data[i].changed) continue;

            // Country

            let country;

            if (data[i]._id) {
                country = adminStore.countries.find(country => country._id === data[i]._id);
            } else {
                country = adminStore.countries.find(country => country.name === data[i].name);
            }

            if (country) {
                data[i]._id = country._id;
                adminStore.table.removeCellMeta(i, 1, 'className');
            } else {
                adminStore.table.setCellMeta(i, 1, 'className', 'error');
                error = true;
            }

            // Year

            if (data[i].year > 1998 && data[i].year < 2018) {
                adminStore.table.removeCellMeta(i, 2, 'className');
                data[i].year = Number.parseFloat(data[i].year);
            } else {
                adminStore.table.setCellMeta(i, 2, 'className', 'error');
                error = true;
            }

            // Population

            if (!Number.isNaN(Number.parseFloat(data[i].value))) {
                adminStore.table.removeCellMeta(i, 3, 'className');
                data[i].value = Number.parseFloat(data[i].value);
            } else {
                adminStore.table.setCellMeta(i, 3, 'className', 'error');
                error = true;
            }

        }

        if (error) {
            adminStore.table.render();
            return;
        }

        adminStore.adminDimmed = true;

        let formattedData = [];
        let changedData = _.filter(data, 'changed');
        for (var i = 0; i < changedData.length; i++) {

            let d = {};

            const index = formattedData.findIndex(d => d._id === changedData[i]._id);

            if (index === -1) {
                d._id = changedData[i]._id || '';
                d.populations = [];
            } else {
                d = formattedData[index];
            }

            d.populations.push({
                year: changedData[i].year,
                value: changedData[i].value,
                delete: changedData[i].delete || false
            });

            if (index === -1) {
                formattedData.push(d);
            }

        }

        Meteor.call('countries.savePopulation', formattedData, (err, res) => {
            adminStore.adminDimmed = false;
            if (err) {
                alert(err);
            } else {
                alert('Save successful');
            }
        });

    }

    render() {

        const {adminStore} = {...this.props};

        return (
            <div>

                <Button animated='vertical' onClick={this._addCountry} color='blue'>
                    <Button.Content hidden>New</Button.Content>
                    <Button.Content visible><Icon name='add circle'/></Button.Content>
                </Button>

                <Button animated='vertical' onClick={this._saveChanges} color='green'>
                    <Button.Content hidden>Save</Button.Content>
                    <Button.Content visible><Icon name='save'/></Button.Content>
                </Button>

                <div ref={ref => this.hot = ref}/>
                <div>{adminStore.adminDimmed}</div>

            </div>

        )

    }
}