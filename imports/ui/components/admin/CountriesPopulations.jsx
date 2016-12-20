// Libs
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, Icon} from 'semantic-ui-react';
import {FileCursor} from 'meteor/ostrio:files';
import Handsontable from 'handsontable/dist/handsontable.full.min.js';
import * as _ from 'lodash';

@observer(['adminStore'])
export default class CountriesPopulations extends Component {

    componentDidMount() {

        const settings = {
            data: adminStore.countriesPopulations.peek(),
            columns: [
                {data: '_id', type: 'text', readOnly: true},
                {data: 'name', type: 'text', readOnly: true},
                {data: 'year', validator: this._validator},
                {data: 'value', validator: this._validator},
                {data: 'createdAt', type: 'text', readOnly: true},
                {data: 'createdBy', type: 'text', readOnly: true},
                {data: 'changedAt', type: 'text', readOnly: true},
                {data: 'changedBy', type: 'text', readOnly: true},
                {data: 'delete', type: 'checkbox', className: 'htCenter htMiddle'}
            ],
            colHeaders: ['ID', 'Name', 'Year', 'Population', 'Created At', 'Created By', 'Changed At', 'Changed By', 'Delete?'],
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

                    adminStore.countriesPopulations.peek[row].changed = true;
                }
            },
            cells: function (row, col, prop) {
                if (prop === 'year' || prop === 'value') {
                    return {readOnly: this.instance.getDataAtRowProp(row, 'delete')};
                }
            },
        };

        adminStore.table = new Handsontable(this.hot, settings);

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
        const dataToSend = [];

        for (var i = 0; i < adminStore.table.countRows(); i++) {

            if (!adminStore.countriesPopulations[i].changed) continue;

            // Year

            if (adminStore.table.getDataAtCell(i, 1)) {
                adminStore.table.removeCellMeta(i, 1, 'className');
            } else {
                adminStore.table.setCellMeta(i, 1, 'className', 'error');
                error = true;
            }

            // Population

            if (adminStore.table.getDataAtCell(i, 1)) {
                adminStore.table.removeCellMeta(i, 1, 'className');
            } else {
                adminStore.table.setCellMeta(i, 1, 'className', 'error');
                error = true;
            }

            dataToSend.push({
                '_id': adminStore.countriesPopulations[i]._id || '',
                'year': adminStore.countriesPopulations[i].name,
                'population': adminStore.countriesPopulations[i].iso,
                'delete': adminStore.countriesPopulations[i].delete || false
            });

        }

        if (error) {
            adminStore.table.render();
            return;
        }

        adminStore.adminDimmed = true;

        Meteor.call('countries.savePopulation', dataToSend, (err, res) => {
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