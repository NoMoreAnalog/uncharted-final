// Libs
import React, {Component, PropTypes} from 'react';
import {List} from 'semantic-ui-react'
import {observer} from 'mobx-react';
import * as _ from 'lodash'

// Components
import Dot from '../common/Dot.jsx';

// Item component - item to make up list in each section
@observer
export default class Item extends Component {

    constructor() {
        super();
        this._onClick = this._onClick.bind(this);
    }

    _onClick() {
        const {item, itemStore} = {...this.props};
        itemStore.setDraw(item);
    }

    render() {

        const {item} = {...this.props};

        const dotColor = item.type === 'country' ? item.color : '#00adc6',
            className = item.draw ? 'draw' : '',
            style = item.draw ? {color: item.color, display: 'inline'} : {display: 'inline'},
            dot = item.draw ?
                <Dot createSvg={true} fill={dotColor} style={{display: 'inline'}}/> :
                <Dot createSvg={true} fill='#636363' style={{display: 'inline'}}/>;

        return (
            <List.Item
                key={item._id}
                className={className}
                onClick={this._onClick}
                style={{marginLeft: 0, minWidth: item.type === 'country' ? 170 : '100%'}}>
                {dot}
                <div className="content" style={style}>{item.name}</div>
            </List.Item>
        )

    }

}

Item.propTypes = {
    itemStore: PropTypes.any.isRequired,
    item: PropTypes.object.isRequired
};