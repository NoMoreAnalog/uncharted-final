import React, {PropTypes} from "react";
import {observer} from 'mobx-react';

import Filter from './Filter.jsx';
import Item from './Item.jsx';

// Sidebar component - bar on right side of screen with filters
const Section = observer((props) =>

    <div className={'section ' + props.classed}>

        <div className="title">{props.title}</div>
        <div className="subtitle">{props.subtitle}</div>

        <Filter
            store={props.store}
            useActiveFilter={props.title === 'Active Indicators'}
        />

        <ul className="list">
            {props.list.map(item =>
                <Item
                    key={item._id}
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
    store: PropTypes.any.isRequired
};

Section.defaultProps = {
    title: 'Title',
    subtitle: 'Click to select/deselect',
    list: [],
    classed: ''
};