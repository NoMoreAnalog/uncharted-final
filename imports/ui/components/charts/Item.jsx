import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';

// Item component - item to make up list in each section
@observer
class Item extends Component {

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

        const className = item.draw ? 'draw item' : 'item';

        return (
            <li
                key={item._id}
                className={className}>

                <button className='clickable' onClick={this._onClick}>
                    <i className="material-icons dot">lens</i> {item.name}
                </button>

            </li>
        )

    }

}

export default Item;

Item.propTypes = {
    itemStore: PropTypes.any.isRequired,
    item: PropTypes.object.isRequired
};

Item.defaultProps = {};