import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';

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

        const className = item.active ? 'active item' : 'item';

        const icon = item.type === 'country' ?
            <i className="material-icons dot">lens</i> :
            <i className="material-icons close">close</i>;

        return (
            <li
                key={item._id}
                className={className}>

                <button className='clickable' onClick={this._clicked}>
                    {icon} {item.name}
                </button>

            </li>
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