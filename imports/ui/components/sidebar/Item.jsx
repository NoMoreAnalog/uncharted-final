import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';

import Dot from '../charts/Dot.jsx';

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

        const className = item.active ? 'active item ui button' : 'item ui button';
        const icon = item.active && item.type === 'indicator' ? <i className="large red remove circle icon"/> : '';

        return (
            <div
                key={item._id}
                className={className}
                onClick={this._clicked}
            >

                <Dot createSvg={true} fill={'#636363'}/>
                {icon}
                <div className="content">{item.name}</div>

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