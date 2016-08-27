import React, {PropTypes} from "react";
import {observer} from 'mobx-react';

import Filter from './Filter.jsx';

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
                <li
                    key={item._id}
                    onClick={props.store.setActive.bind(this, item)}
                    className={item.active ? 'active item' : 'item'}>

                    {props.title === 'Countries' ? <i className="material-icons dot">lens</i> : ''}
                    {props.title === 'Active Indicators' ? <i className="material-icons close">close</i> : ''}
                    {item.name}

                </li>
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