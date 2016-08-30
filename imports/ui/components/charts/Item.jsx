import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

// Item component - item to make up list in each section
const Item = observer((props) =>

    <li key={props.item._id} className={props.item.active ? 'active item' : 'item'}>

        <button className='clickable' onClick={props.store.setActive.bind(this, props.item)}>
            <i className="material-icons dot">lens</i>
            {props.item.name}
        </button>

    </li>

)

export default Item;

Item.propTypes = {
    store: PropTypes.any.isRequired,
    item: PropTypes.object.isRequired
};

Item.defaultProps = {};