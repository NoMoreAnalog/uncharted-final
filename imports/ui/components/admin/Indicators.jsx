// Libs
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Form, Button, Radio, Divider, Icon} from 'semantic-ui-react'
import Handsontable from 'handsontable/dist/handsontable.full.min.js';
import * as _ from 'lodash';

// Components
import PopupToConfirm from './PopupToConfirm';

@observer(['adminStore'])
export default class Indicators extends Component {

    table;
    showDeleted: false;
    settings = {};
    data = [];
    serializedForm;

    constructor() {
        super();

        this._handleSubmit = this._handleSubmit.bind(this);
        this._addIndicator = this._addIndicator.bind(this);
        this._saveChanges = this._saveChanges.bind(this);
        this._loadData = this._loadData.bind(this);
        this._toggleDeleted = this._toggleDeleted.bind(this);

        this.settings = {
            data: this.data,
            columns: [
                {data: '_id', type: 'text', readOnly: true},
                {data: 'name', type: 'text', validator: this._validator},
                {data: 'name_ar', type: 'text', validator: this._validator},
                {data: 'code', type: 'text', validator: this._validator},
                {data: 'notes', type: 'text'},
                {data: 'notes_ar', type: 'text'},
                {data: 'createdAt', type: 'text', readOnly: true},
                {data: 'createdBy', type: 'text', readOnly: true},
                {data: 'changedAt', type: 'text', readOnly: true},
                {data: 'changedBy', type: 'text', readOnly: true},
                {data: 'delete', type: 'checkbox', className: 'htCenter htMiddle'}
            ],
            colHeaders: ['ID', 'Name EN', 'Name AR', 'Code', 'Notes EN', 'Note AR', 'Created At', 'Created By', 'Changed At', 'Changed By', 'Delete?'],
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
                if (prop === 'name' || prop === 'name_ar' || prop === 'code' || prop === 'notes' || prop === 'notes_ar') {
                    return {readOnly: this.instance.getDataAtRowProp(row, 'delete')};
                };
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

        this.props.adminStore.indicators.forEach(indicator => {

            if ((form.indicator.length > 0 && !form.indicator.find(value => value === indicator._id)) ||
                (form.code.length > 0 && !form.code.find(value => value === indicator._id)) ||
                (!this.showDeleted && indicator.delete))
                return;

            this.data.push({
                _id: indicator._id,
                name: indicator.name,
                name_ar: indicator.name_ar,
                code: indicator.code,
                notes: indicator.notes,
                notes_ar: indicator.notes_ar,
                createdAt: indicator.createdAt,
                createdBy: indicator.createdBy,
                changedAt: indicator.changedAt,
                changedBy: indicator.changedBy,
                delete: indicator.delete,
                changed: false
            });

        });

        this.table.loadData(this.data);
    }

    _addIndicator() {
        this.data.push({});
        this.table.loadData(this.data);
    }

    _validator(value, callback) {
        callback(true);
        this.instance.removeCellMeta(this.row, this.col, 'className');
        this.instance.render();
    }

    _saveChanges() {

        if (!this.table || !_.find(this.data, 'changed')) return;

        let error = false;

        for (var i = 0; i < this.table.countRows(); i++) {

            if (!this.data[i].changed) continue;

            if (this.table.getDataAtCell(i, 1)) {
                this.table.removeCellMeta(i, 1, 'className');
            } else {
                this.table.setCellMeta(i, 1, 'className', 'error');
                error = true;
            }

            if (this.table.getDataAtCell(i, 2)) {
                this.table.removeCellMeta(i, 2, 'className');
            } else {
                this.table.setCellMeta(i, 2, 'className', 'error');
                error = true;
            }

        }

        if (error) {
            this.table.render();
            return;
        }

        this.props.adminStore.adminDimmed = true;

        Meteor.call('indicators.save', _.filter(this.data, 'changed'), (err, res) => {
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

                <Button animated='vertical' onClick={this._addIndicator} color='blue'>
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