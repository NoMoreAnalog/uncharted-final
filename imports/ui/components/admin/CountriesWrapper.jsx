// Libs
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Menu, Form, Radio, Button, Divider} from 'semantic-ui-react';
import * as _ from 'lodash';

// Components
import PopupToConfirm from './PopupToConfirm';

@observer(['adminStore'])
export default class CountriesWrapper extends Component {

    state = {country: [], iso: []}

    serializedForm;

    _handleSubmit = (e, serializedForm) => {

        e.preventDefault();

        const {adminStore} = {...this.props};

        this.serializedForm = serializedForm;

        if (_.find(adminStore.countriesChanged, 'changed')) {
            this.popup.setState({
                open: true,
                header: 'Changes Not Saved',
                content: 'Changes will be lost. Do you want to continue?',
                left: 'Keep Editing',
                right: 'Continue',
                callback: this._loadData
            });
        } else {
            this._loadData();
        }

    }

    _loadData = () => {

        const {adminStore} = {...this.props};
        const ids = _.uniq(_.concat(this.serializedForm.country, this.serializedForm.iso));

        adminStore.loadCountriesData(ids);

    }

    _clearForm = () => {
        const {adminStore} = {...this.props};
        adminStore.clearCountriesData();
        this.setState({country: [], iso: []});
        this.serializedForm = null;
    }

    _goToRoute = route => {
        const {router} = {...this.props};
        this._clearForm();
        adminStore.table.destroy();
        router.push('/admin/countries/' + route);
    }

    render() {

        const {children, adminStore} = {...this.props};
        const {country, iso} = {...this.state};

        return (
            <div>

                <PopupToConfirm ref={ref => this.popup = ref}/>

                <Form onSubmit={this._handleSubmit}>

                    <Form.Group widths='equal'>
                        <Form.Dropdown
                            name='country'
                            label='Country'
                            placeholder='Country' search multiple selection
                            options={adminStore.countryNameOptions}
                            value={country}
                            onChange={(event, value) => this.setState({country: value.value})}
                        />
                        <Form.Dropdown
                            name='iso'
                            label='ISO'
                            placeholder='ISO'
                            search multiple selection
                            options={adminStore.countryISOOptions}
                            value={iso}
                            onChange={(event, value) => this.setState({iso: value.value})}
                        />
                    </Form.Group>

                    <Radio
                        value='showDeleted'
                        name='showDeleted'
                        toggle
                        label='Show records marked for deletion'
                        onChange={() => adminStore.showDeleted = !adminStore.showDeleted}
                    />

                    <br/><br/>

                    <Button icon='search' content='Search' color='teal'/>
                    <Button icon='remove' content='Clear' color='red' type='button' onClick={this._clearForm}/>

                </Form>

                <Divider/>

                <Menu secondary>
                    <Menu.Item
                        link
                        name='overview'
                        active={location.pathname === '/admin/countries/overview'}
                        onClick={this._goToRoute.bind(this, 'overview')}
                    />
                    <Menu.Item
                        link
                        name='populations'
                        active={location.pathname === '/admin/countries/populations'}
                        onClick={this._goToRoute.bind(this, 'populations')}
                    />
                </Menu>

                {children}

            </div>

        )

    }

}