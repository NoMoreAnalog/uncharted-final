import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Menu, Dropdown, Icon} from 'semantic-ui-react'

@observer(['chartStore'])
export default class NavBar extends Component {

    state = {activeItemName: 'data'}

    _handleItemClick = (e, {name}) => this.setState({activeItemName: name})

    render() {

        const {chartStore} = {...this.props};
        const {activeItemName} = {...this.state};

        const menuStyle = {
            backgroundColor: '#525866',
            borderRadius: 0
        };

        const itemStyle = {
            margin: 20,
            paddingTop: 10,
            fontWeight: 'bolder',
            borderTop: '3px solid #525866'
        };

        const activeItemStyle = {
            margin: 20,
            paddingTop: 10,
            fontWeight: 'bolder',
            borderTop: '3px solid #00adc6',
            borderRadius: 0,
            color: '#00adc6 !important'
        };

        const k4aItemStyle = {
            marginLeft: 30,
            marginRight: 50
        };

        const k4aImgStyle = {
            width: 280
        };

        return (

            <div className='nav-bar'>

                <Menu style={menuStyle} borderless inverted>

                    <Menu.Item style={k4aItemStyle}>
                        <img style={k4aImgStyle} className="k4a" src="K4A.png"/>
                    </Menu.Item>

                    <Menu.Item
                        fitted
                        style={activeItemName === 'home' ? activeItemStyle : itemStyle}
                        name='home'
                        onClick={this._handleItemClick}>
                        HOME
                    </Menu.Item>

                    <Menu.Item
                        fitted
                        style={activeItemName === 'data' ? activeItemStyle : itemStyle}
                        name='data'
                        onClick={this._handleItemClick}>
                        DATA
                    </Menu.Item>

                    <Menu.Item
                        fitted
                        style={activeItemName === 'index' ? activeItemStyle : itemStyle}
                        name='index'
                        onClick={this._handleItemClick}>
                        INDEX
                    </Menu.Item>

                    <Menu.Item
                        fitted
                        style={activeItemName === 'contact' ? activeItemStyle : itemStyle}
                        name='contact'
                        onClick={this._handleItemClick}>
                        CONTACT US
                    </Menu.Item>

                    <Menu.Menu position='right'>

                        <Menu.Item onClick={chartStore.toggleLanguage}>
                            <Icon name='world'/>{chartStore.language}
                        </Menu.Item>

                        <Menu.Item>
                            <Icon name='lock'/>Log In / Register
                        </Menu.Item>

                        <Menu.Item href='https://twitter.com/ArabKnowledge' target='_blank'>
                            <Icon name='twitter'/>
                        </Menu.Item>

                        <Menu.Item href='https://www.facebook.com/ArabKnowledgeProject' target='_blank'>
                            <Icon name='facebook f'/>
                        </Menu.Item>

                    </Menu.Menu>

                </Menu>

            </div>

        )

    }

}