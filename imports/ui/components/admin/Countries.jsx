// Libs
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Form, Button, Radio, Divider, Icon} from 'semantic-ui-react';
import Handsontable from 'handsontable/dist/handsontable.full.min.js';
import * as _ from 'lodash';

// Components
import PopupToConfirm from './PopupToConfirm';

@observer(['adminStore'])
export default class Countries extends Component {

    table;
    showDeleted: false;
    settings = {};
    data = [];
    serializedForm;
    selectedColor = '';

    constructor() {
        super();

        window.this = this;

        this._handleSubmit = this._handleSubmit.bind(this);
        this._addCountry = this._addCountry.bind(this);
        this._saveChanges = this._saveChanges.bind(this);
        this._loadData = this._loadData.bind(this);
        this._toggleDeleted = this._toggleDeleted.bind(this);

        this.settings = {
            data: this.data,
            columns: [
                {data: '_id', type: 'text', readOnly: true},
                {data: 'name', type: 'text', validator: this._validator},
                {data: 'iso', type: 'text', validator: this._validator},
                {data: 'color', renderer: this._colorRenderer, readOnly: true},
                {data: 'createdAt', type: 'text', readOnly: true},
                {data: 'createdBy', type: 'text', readOnly: true},
                {data: 'changedAt', type: 'text', readOnly: true},
                {data: 'changedBy', type: 'text', readOnly: true},
                {data: 'delete', type: 'checkbox', className: 'htCenter htMiddle'}
            ],
            colHeaders: ['ID', 'Name', 'ISO', 'Color', 'Created At', 'Created By', 'Changed At', 'Changed By', 'Delete?'],
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
                if (prop === 'name' || prop === 'iso' || prop === 'color') {
                    return {readOnly: this.instance.getDataAtRowProp(row, 'delete')};
                }
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

    _colorRenderer(instance, td, row, col, prop, value, cellProperties) {

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

        if (!this.serializedForm) return;

        this.data = [];

        const form = this.serializedForm;

        this.props.adminStore.countries.forEach(country => {

            if ((form.country.length > 0 && !form.country.find(value => value === country._id)) ||
                (form.iso.length > 0 && !form.iso.find(value => value === country._id)) ||
                (!this.showDeleted && country.delete))
                return;

            this.data.push({
                _id: country._id,
                name: country.name,
                iso: country.iso,
                color: country.color,
                createdAt: country.createdAt,
                createdBy: country.createdBy,
                changedAt: country.changedAt,
                changedBy: country.changedBy,
                delete: country.delete,
                changed: false
            });

        });

        this.table.loadData(this.data);
    }

    _addCountry() {
        this.data.push({});
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

            // Name

            if (this.table.getDataAtCell(i, 1)) {
                this.table.removeCellMeta(i, 1, 'className');
            } else {
                this.table.setCellMeta(i, 1, 'className', 'error');
                error = true;
            }

            // ISO

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

        Meteor.call('countries.save', _.filter(this.data, 'changed'), (err, res) => {
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

                <Button animated='vertical' onClick={this._addCountry} color='blue'>
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