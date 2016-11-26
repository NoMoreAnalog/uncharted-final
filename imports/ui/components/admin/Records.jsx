// Libs
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Form, Button, Radio, Divider, Icon} from 'semantic-ui-react'
import Handsontable from 'handsontable/dist/handsontable.full.min.js';
import * as _ from 'lodash';

// Components
import PopupToConfirm from './PopupToConfirm';

@observer(['adminStore'])
export default class Records extends Component {

    table;
    showDeleted: false;
    settings = {};
    data = [];
    serializedForm;

    constructor(props) {
        super(props);

        window.this = this;

        this._handleSubmit = this._handleSubmit.bind(this);
        this._addRecord = this._addRecord.bind(this);
        this._saveChanges = this._saveChanges.bind(this);
        this._loadData = this._loadData.bind(this);
        this._toggleDeleted = this._toggleDeleted.bind(this);

        this.settings = {
            data: this.data,
            columns: [
                {data: '_id', readOnly: true},
                {
                    data: 'countryName',
                    type: 'dropdown',
                    source: (query, callback) => {
                        callback(props.adminStore.countryNameSource);
                    },
                    readOnly: true,
                    validator: this._validator
                },
                {
                    data: 'indicatorName',
                    type: 'dropdown',
                    source: (query, callback) => {
                        callback(props.adminStore.indicatorNameSource);
                    },
                    validator: this._validator
                },
                {
                    data: 'year',
                    type: 'dropdown',
                    source: this._yearSource(),
                    validator: this._validator
                },
                {
                    data: 'value',
                    type: 'text',
                    validator: this._validator
                },
                {data: 'createdAt', readOnly: true},
                {data: 'createdBy', readOnly: true},
                {data: 'changedAt', readOnly: true},
                {data: 'changedBy', readOnly: true},
                {data: 'delete', type: 'checkbox', className: 'htCenter htMiddle'}
            ],
            colHeaders: ['ID', 'Country', 'Indicator', 'Year', 'Value', 'Created At', 'Created By', 'Changed At', 'Changed By', 'Delete?'],
            columnSorting: true,
            manualColumnResize: true,
            manualColumnMove: true,
            rowHeaders: true,
            sortIndicator: true,
            contextMenu: ['undo', 'redo'],
            afterChange: (changes, source) => {

                if (!changes) return;

                for (var i = 0; i < changes.length; i++) {

                    const row = changes[i][0];
                    const prop = changes[i][1];
                    const oldValue = changes[i][2];
                    const newValue = changes[i][3];

                    if (prop == 'delete' && typeof newValue != 'boolean') {
                        this.table.setDataAtRowProp(row, prop, false);
                    }

                    this.data[row].changed = true;

                }

            },
            cells: function (row, col, prop) {

                let cellProperties;

                switch (prop) {
                    case 'countryName':
                    case 'indicatorName':
                        cellProperties = {readOnly: this.instance.getDataAtRowProp(row, 'delete')};
                        cellProperties = {readOnly: !!this.instance.getDataAtRowProp(row, '_id')};
                        break;
                    case 'year':
                    case 'value':
                        cellProperties = {readOnly: this.instance.getDataAtRowProp(row, 'delete')};
                        break;
                }

                return cellProperties;

            },
        };

    }

    componentDidMount() {
        this.table = new Handsontable(this.hot, this.settings);
    }

    componentDidUpdate() {
        this._loadData();
        this.table.render();
    }

    _validator(value, callback) {
        callback(true);
        this.instance.removeCellMeta(this.row, this.col, 'className');
        this.instance.render();
    }

    _yearSource() {
        return [
            '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008',
            '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'
        ];
    }

    _handleSubmit(e, serializedForm) {
        e.preventDefault()

        this.serializedForm = serializedForm;

        if (_.find(this.data, 'changed')) {
            this.popup.setState({
                open: true,
                header: 'Changes Not Saved',
                content: 'Changes will be lost. Do you want to continue?',
                left: 'Keep Editing',
                right: 'Continue',
                callback: this._loadData
            });
            return;
        }

        this._loadData();
    }

    _loadData() {

        this.data = [];

        if (!this.serializedForm) return;

        const form = this.serializedForm;

        this.props.adminStore.records.forEach(record => {

            if ((form.country.length > 0 && !form.country.find(value => value === record.countryId)) ||
                (form.iso.length > 0 && !form.iso.find(value => value === record.countryId)) ||
                (form.indicator.length > 0 && !form.indicator.find(value => value === record.indicatorId)) ||
                (form.code.length > 0 && !form.code.find(value => value === record.indicatorId)) ||
                (!this.showDeleted && record.delete))
                return;

            this.data.push({
                _id: record._id,
                countryId: record.countryId,
                countryName: record.countryName,
                indicatorId: record.indicatorId,
                indicatorName: record.indicatorName,
                year: record.year,
                value: record.value,
                createdAt: record.createdAt,
                createdBy: record.createdBy,
                changedAt: record.changedAt,
                changedBy: record.changedBy,
                delete: record.delete,
                changed: false
            });

        });

        this.table.loadData(this.data);
    }

    _addRecord() {
        this.data.push({});
        this.table.loadData(this.data);
    }

    _saveChanges() {

        if (!this.table || !_.find(this.data, 'changed')) return;

        let error = false;

        for (var i = 0; i < this.data.length; i++) {

            if (!this.data[i].changed) continue;

            // Country

            const country = this.props.adminStore.countries.find(country => country.name === this.data[i].countryName);
            if (country) {
                this.data[i].countryId = country._id;
                this.table.removeCellMeta(i, 1, 'className');
            } else {
                this.table.setCellMeta(i, 1, 'className', 'error');
                error = true;
            }

            // Indicator

            const indicator = this.props.adminStore.indicators.find(indicator => indicator.name === this.data[i].indicatorName);
            if (indicator) {
                this.data[i].indicatorId = indicator._id;
                this.table.removeCellMeta(i, 2, 'className');
            } else {
                this.table.setCellMeta(i, 2, 'className', 'error');
                error = true;
            }

            // Year

            if (this.data[i].year > 1999 && this.data[i].year < 2017) {
                this.table.removeCellMeta(i, 3, 'className');
            } else {
                this.table.setCellMeta(i, 3, 'className', 'error');
                error = true;
            }

            // Value

            if (!Number.isNaN(Number.parseFloat(this.data[i].value))) {
                this.table.removeCellMeta(i, 4, 'className');
            } else {
                this.table.setCellMeta(i, 4, 'className', 'error');
                error = true;
            }

        }

        if (error) {
            this.table.render();
            return;
        }

        this.props.adminStore.adminDimmed = true;

        let formattedData = [];
        let changedData = _.filter(this.data, 'changed');
        for (var i = 0; i < changedData.length; i++) {

            let d = {};

            const index = formattedData.findIndex(d => d.country === changedData[i].countryId && d.indicator === changedData[i].indicatorId);

            if (index === -1) {
                d._id = changedData[i]._id;
                d.country = changedData[i].countryId;
                d.indicator = changedData[i].indicatorId;
                d.values = [];
            } else {
                d = formattedData[index];
            }

            d.values.push({
                year: changedData[i].year,
                value: changedData[i].value,
                delete: changedData[i].delete
            });

            if (index === -1) {
                formattedData.push(d);
            }

        }

        Meteor.call('records.save', formattedData, (err, res) => {
            this.props.adminStore.adminDimmed = false;
            if (err) {
                alert(err);
            } else {
                alert('Save successful');
                this._loadData();
            }
        });
    }

    _toggleDeleted() {
        this.showDeleted = !this.showDeleted;
    }

    render() {
        return (
            <div>

                <PopupToConfirm ref={(ref) => this.popup = ref}/>

                <Form onSubmit={this._handleSubmit}>

                    <Form.Group widths='equal'>
                        <Form.Dropdown
                            name='country'
                            label='Country'
                            placeholder='Country'
                            search
                            multiple
                            selection
                            options={this.props.adminStore.countryNameOptions}
                        />
                        <Form.Dropdown
                            name='iso'
                            label='ISO'
                            placeholder='ISO'
                            search
                            multiple
                            selection
                            options={this.props.adminStore.countryISOOptions}
                        />
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Dropdown
                            name='indicator'
                            label='Indicator'
                            placeholder='Indicator'
                            search
                            multiple
                            selection
                            options={this.props.adminStore.indicatorNameOptions}
                        />
                        <Form.Dropdown
                            name='code'
                            label='Code'
                            placeholder='Code'
                            search
                            multiple
                            selection
                            options={this.props.adminStore.indicatorCodeOptions}
                        />
                    </Form.Group>

                    <Radio
                        value='showDeleted'
                        name='showDeleted'
                        toggle
                        label='Show records marked for deletion'
                        onChange={this._toggleDeleted}
                    />

                    <br/><br/>

                    <Button icon='search' content='Search' color='teal'/>

                </Form>

                <Divider/>

                <Button animated='vertical' onClick={this._addRecord} color='blue'>
                    <Button.Content hidden>New</Button.Content>
                    <Button.Content visible><Icon name='add circle'/></Button.Content>
                </Button>

                <Button animated='vertical' onClick={this._saveChanges} color='green'>
                    <Button.Content hidden>Save</Button.Content>
                    <Button.Content visible><Icon name='save'/></Button.Content>
                </Button>

                <div ref={(ref) => this.hot = ref}/>

            </div>

        );
    }
}