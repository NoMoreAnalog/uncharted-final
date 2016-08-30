import React, {PropTypes} from "react";
import {observer} from 'mobx-react';

// Filter component - used to filter countries and indicator sections
const Filter = observer((props) =>
    <input
        className={props.store.sideBarExpanded ?
            'filter show' :
            'filter hide'}
        placeholder="Search"
        onChange={(e) => {
            props.useActiveFilter ?
                props.itemStore.activeFilter = e.target.value :
                props.itemStore.filter = e.target.value;
        }}
    />
)

export default Filter;

Filter.propTypes = {
    itemStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired,
    useActiveFilter: PropTypes.bool
};

Filter.defaultProps = {
    useActiveFilter: false
};