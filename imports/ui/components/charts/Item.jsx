import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';

import Dot from '../charts/Dot.jsx';

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
            <div
                key={item._id}
                className={className}
                onClick={this._onClick}
            >

                <Dot createSvg={true} fill={'#636363'}/>
                <div className="content">{item.name}</div>

            </div>
        )

    }

}

export default Item;

Item.propTypes = {
    itemStore: PropTypes.any.isRequired,
    item: PropTypes.object.isRequired
};

Item.defaultProps = {};