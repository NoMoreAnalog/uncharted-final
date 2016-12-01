import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';
import {List} from 'semantic-ui-react'

import Dot from '../charts/common/Dot.jsx';

// Item component - item to make up list in each section
@observer(['chartStore'])
export default class Item extends Component {

    constructor() {
        super();
        this._clicked = this._clicked.bind(this);
    }

    _clicked() {
        const {item, itemStore, chartStore} = {...this.props};

        itemStore.setActive(item);
        chartStore.chartDetermination();
    }

    render() {

        const {item} = {...this.props};

        const className = item.active ? 'active item ui button' : 'item ui button',
            dot = item.active ? <Dot createSvg={true} fill={item.color}/> : <Dot createSvg={true} fill='#636363'/>,
            icon = item.active && item.type === 'indicator' ? <i className='large red remove circle icon'/> : '',
            style = item.active ? {color: item.color} : {};

        return (
            <List.Item
                key={item._id}
                className={className}
                onClick={this._clicked}>
                {dot}
                {icon}
                <div className='content' style={style}>{item.name}</div>
            </List.Item>
        )

    }

}

Item.wrappedComponent.propTypes = {
    itemStore: PropTypes.any.isRequired,
    item: PropTypes.object.isRequired
};