// Libs
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, Icon} from 'semantic-ui-react';
import Handsontable from 'handsontable/dist/handsontable.full.min.js';
import * as _ from 'lodash';

@observer(['adminStore'])
export default class CountriesOverview extends Component {

    componentDidMount() {

        const {adminStore} = {...this.props};

        adminStore.countriesComponent = 'CountriesOverview';

        const settings = {
            data: adminStore.countriesOverview.peek(),
            columns: [
                {data: '_id', type: 'text', readOnly: true},
                {data: 'flagPath', renderer: this._flagRenderer, readOnly: true},
                {data: 'name', type: 'text', validator: this._validator},
                {data: 'iso', type: 'text', validator: this._validator},
                {data: 'color', renderer: this._colorRenderer, readOnly: true},
                {data: 'createdAt', type: 'text', readOnly: true},
                {data: 'createdBy', type: 'text', readOnly: true},
                {data: 'changedAt', type: 'text', readOnly: true},
                {data: 'changedBy', type: 'text', readOnly: true},
                {data: 'delete', type: 'checkbox', className: 'htCenter htMiddle'}
            ],
            colHeaders: ['ID', 'Flag', 'Name', 'ISO', 'Color', 'Created At', 'Created By', 'Changed At', 'Changed By', 'Delete?'],
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

                    adminStore.countriesOverview[row].changed = true;
                }
            },
            cells: function (row, col, prop) {
                if (prop === 'name' || prop === 'iso' || prop === 'color') {
                    return {readOnly: this.instance.getDataAtRowProp(row, 'delete')};
                }
            },
        };

        adminStore.table = new Handsontable(this.hot, settings);

    }

    componentWillUnmount() {
        adminStore.clearCountriesData();
    }

    _flagRenderer = (instance, td, row, col, prop, value, cellProperties) => {

        let element;

        let src = instance.getDataAtRowProp(row, prop);

        element = document.createElement('IMG');

        element.setAttribute('width', '100%');
        element.setAttribute('height', 'auto');
        element.setAttribute('src', src);
        element.setAttribute('for', 'upload-flag');

        element.style.paddingTop = '4px';
        element.style.opacity = instance.getDataAtRowProp(row, 'delete') ? '.3' : '1';

        element.onclick = () => {
            this.countryName = instance.getDataAtRowProp(row, 'name');
            this.countryId = instance.getDataAtRowProp(row, '_id');
            document.getElementById('upload-flag').click();
        };

        Handsontable.Dom.empty(td);
        td.appendChild(element);

        return td;

    }

    _colorRenderer = (instance, td, row, col, prop, value, cellProperties) => {

        let element;

        if (instance.getDataAtRowProp(row, 'delete')) {

            element = document.createElement('DIV');
            element.innerHTML = value || '';

        } else {

            element = document.createElement('INPUT');

            const picker = new jscolor(element);
            picker.fromString(value || 'ffffff');
            picker.onFineChange = () => {
                instance.setDataAtCell(row, col, picker.toString());
                instance.setDataAtRowProp(row, 'changed', true);
            };

        }

        Handsontable.Dom.empty(td);
        td.appendChild(element);

        return td;

    }

    _addCountry = () => {
        const {adminStore} = {...this.props};
        adminStore.countriesOverview.replace(
            adminStore.countriesOverview.peek().concat([{'new': true}])
        );
    }

    _validator(value, callback) {
        callback(true);
        this.instance.removeCellMeta(this.row, this.col, 'className');
        this.instance.render();
    }

    _saveChanges = () => {

        const {adminStore} = {...this.props};

        if (!adminStore.table || !_.find(adminStore.countriesOverview.peek(), 'changed')) return;

        const dataToSend = [];
        let error = false;

        for (var i = 0; i < adminStore.table.countRows(); i++) {

            if (!adminStore.countriesOverview[i].changed) continue;

            // Name

            if (adminStore.table.getDataAtCell(i, 1)) {
                adminStore.table.removeCellMeta(i, 1, 'className');
            } else {
                adminStore.table.setCellMeta(i, 1, 'className', 'error');
                error = true;
            }

            // ISO

            if (adminStore.table.getDataAtCell(i, 2)) {
                adminStore.table.removeCellMeta(i, 2, 'className');
            } else {
                adminStore.table.setCellMeta(i, 2, 'className', 'error');
                error = true;
            }

            // Color

            if (adminStore.table.getDataAtCell(i, 3)) {
                adminStore.table.removeCellMeta(i, 3, 'className');
            } else {
                adminStore.table.setCellMeta(i, 3, 'className', 'error');
                error = true;
            }

            dataToSend.push({
                '_id': adminStore.countriesOverview[i]._id || '',
                'name': adminStore.countriesOverview[i].name,
                'iso': adminStore.countriesOverview[i].iso,
                'color': adminStore.countriesOverview[i].color,
                'flagId': adminStore.countriesOverview[i].flagId,
                'delete': adminStore.countriesOverview[i].delete || false
            });

        }

        if (error) {
            adminStore.table.render();
            return;
        }

        adminStore.adminDimmed = true;

        Meteor.call('countries.saveOverview', dataToSend, (err, res) => {
            adminStore.adminDimmed = false;
            if (err) {
                alert(err);
            } else {
                alert('Save successful');
            }
        });

    }

    _uploadFlag = (event) => {

        const {adminStore} = {...this.props};

        const file = event.currentTarget.files[0];

        if (file) {
            adminStore.uploadFlag(file, this.countryId, this.countryName);
        }

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

                <input type='file' id='upload-flag' accept="image/*" style={{display: 'none'}} onChange={this._uploadFlag}/>

                <div ref={ref => this.hot = ref}/>
                <div>{adminStore.adminDimmed}</div>

            </div>

        )

    }

}