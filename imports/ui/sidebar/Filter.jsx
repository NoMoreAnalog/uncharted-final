import React, {PropTypes} from "react";
import {observer} from 'mobx-react';

// Filter component - used to filter countries and indicator sections
const Filter = observer((props) =>
    <input
        className="filter"
        placeholder="Search"
        onChange={(e) => {
            props.useActiveFilter ?
                props.store.activeFilter = e.target.value :
                props.store.filter = e.target.value;
        }}
    />
)

export default Filter;

Filter.propTypes = {
    store: PropTypes.any.isRequired,
    useActiveFilter: PropTypes.bool
};

Filter.defaultProps = {
    useActiveFilter: false
};