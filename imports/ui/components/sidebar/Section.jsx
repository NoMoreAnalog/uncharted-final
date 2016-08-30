import React, {PropTypes} from "react";
import {observer} from 'mobx-react';

import Filter from './Filter.jsx';
import Item from './Item.jsx';

// Section component - these make up the side bar
const Section = observer((props) =>

    <div className={'section ' + props.classed}>

        <div className="title">{props.title}</div>
        <div className="subtitle">{props.subtitle}</div>

        <Filter
            itemStore={props.itemStore}
            store={props.store}
            useActiveFilter={props.title === 'Active Indicators'}
        />

        <ul className="list">
            {props.list.map(item =>
                <Item
                    key={item._id}
                    itemStore={props.itemStore}
                    store={props.store}
                    item={item}
                />
            )}
        </ul>

    </div>
)

export default Section;

Section.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    list: PropTypes.array.isRequired,
    classed: PropTypes.string.isRequired,
    itemStore: PropTypes.any.isRequired,
    store: PropTypes.any
};

Section.defaultProps = {
    title: 'Title',
    subtitle: 'Click to select/deselect',
    list: [],
    classed: ''
};