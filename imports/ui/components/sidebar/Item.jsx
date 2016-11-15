import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';

import Dot from '../charts/common/Dot.jsx';

// Item component - item to make up list in each section
@observer(['store'])
class Item extends Component {

    constructor() {
        super();
        this._clicked = this._clicked.bind(this);
    }

    _clicked() {
        const {item, itemStore} = {...this.props};

        itemStore.setActive(item);
        store.chartDetermination(itemStore);
    }

    render() {

        const {item} = {...this.props};

        const className = item.active ? 'active item ui button' : 'item ui button',
            dot = item.active ? <Dot createSvg={true} fill={item.color}/> : <Dot createSvg={true} fill='#636363'/>,
            icon = item.active && item.type === 'indicator' ? <i className='large red remove circle icon'/> : '',
            style = item.active ? {color: item.color} : {};

        return (
            <div
                key={item._id}
                className={className}
                onClick={this._clicked}>
                {dot}
                {icon}
                <div className='content' style={style}>{item.name}</div>
            </div>
        )

    }

}

export default Item;

Item.wrappedComponent.propTypes = {
    itemStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired,
    item: PropTypes.object.isRequired
};

Item.wrappedComponent.defaultProps = {};