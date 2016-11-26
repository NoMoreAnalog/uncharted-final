// Libs
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Container, Menu, Segment, Dimmer, Header, Icon} from 'semantic-ui-react'
import moment from 'moment';
import pikaday from 'pikaday';
import Zeroclipboard from 'zeroclipboard';
import numbro from 'numbro';

// Components
import NavLink from './NavLink';

// Files
import 'handsontable/dist/handsontable.full.min.css';

@observer(['adminStore'])
export default class AdminLayout extends Component {

    render() {

        const {adminStore, children, location} = {...this.props};

        return (
            <Container fluid>

                <Menu pointing secondary>

                    <NavLink to='/admin/countries'>
                        <Menu.Item link name='countries' active={location.pathname === '/admin/countries'}/>
                    </NavLink>

                    <NavLink to='/admin/indicators'>
                        <Menu.Item link name='indicators' active={location.pathname === '/admin/indicators'}/>
                    </NavLink>

                    <NavLink to='/admin/records'>
                        <Menu.Item link name='records' active={location.pathname === '/admin/records'}/>
                    </NavLink>

                    <Menu.Menu position='right'>
                        <NavLink to='/'>
                            <Menu.Item link position='right'>Go To Charts</Menu.Item>
                        </NavLink>
                    </Menu.Menu>

                </Menu>

                <Segment>
                    <Dimmer active={adminStore.adminDimmed} page>
                        <Header as='h2' icon inverted>
                            <Icon size='massive' loading name='spinner'/>
                            Saving data, please wait...
                        </Header>
                    </Dimmer>
                    {children}
                </Segment>

            </Container>
        )

    }

}