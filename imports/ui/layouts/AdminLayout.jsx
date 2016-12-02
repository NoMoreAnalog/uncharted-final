// Libs
import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {observer} from 'mobx-react';
import {Container, Menu, Segment, Dimmer, Header, Icon} from 'semantic-ui-react'
import moment from 'moment';
import pikaday from 'pikaday';
import Zeroclipboard from 'zeroclipboard';
import numbro from 'numbro';

// Components
import NavLink from './NavLink';
import SignIn from '../components/admin/SignIn.jsx';

// Files
import 'handsontable/dist/handsontable.full.min.css';

@observer(['adminStore'])
export default class AdminLayout extends Component {

    state = {isAuthenticated: false};
    handle;

    componentWillMount() {
        this.handle = Tracker.autorun(() => {
            this.setState({isAuthenticated: Meteor.userId() !== null});
        })
    }

    componentWillUnmount() {
        this.handle.stop();
    }

    _signOut = () => {
        this.setState({isAuthenticated: false});
        Meteor.logout();
    }

    render() {

        const {adminStore, children, location} = {...this.props};
        const {isAuthenticated} = {...this.state};

        if (!isAuthenticated || Meteor.userId() === null) return <SignIn/>;

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
                        <Menu.Item link position='right' onClick={this._signOut}>Sign Out</Menu.Item>
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