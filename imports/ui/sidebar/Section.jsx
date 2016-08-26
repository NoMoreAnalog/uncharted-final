import React, {PropTypes} from "react";
import {observer} from 'mobx-react';

// Sidebar component - bar on right side of screen with filters
const Section = observer((props) =>

    <div className={'section ' + props.classed}>

        <div className="title">{props.title}</div>
        <div className="subtitle">{props.subtitle}</div>

        <input className="filter" type="text" placeholder="Search"/>

        <div className="list">
            <ul>
                {props.list.map(item =>
                    <li key={item._id}>
                        <a href="#">{item.name}</a>
                    </li>
                )}
            </ul>
        </div>

    </div>

)

export default Section;

Section.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    classed: PropTypes.string.isRequired
};

Section.defaultProps = {
    title: 'Title',
    subtitle: 'Title',
    list: [],
    classed: ''
};