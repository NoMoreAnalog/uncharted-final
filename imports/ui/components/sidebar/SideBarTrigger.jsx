import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

// SideBarTrigger component - should the side bar be expanded or not
const SideBarTrigger = observer((props) =>

    <button
        className="side-bar-trigger"
        onClick={props.store.toggleSideBarExpanded}
    >
        {props.store.sideBarExpanded ?
            <i className="material-icons">chevron_right</i> :
            <i className="material-icons">search</i>}
    </button>

)

export default SideBarTrigger;

SideBarTrigger.propTypes = {
    store: PropTypes.any.isRequired
};
SideBarTrigger.defaultProps = {};