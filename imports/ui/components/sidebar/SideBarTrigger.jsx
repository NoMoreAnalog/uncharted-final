import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

// SideBarTrigger component - should the side bar be expanded or not
const SideBarTrigger = observer(['store'], (props) =>

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

SideBarTrigger.wrappedComponent.propTypes = {
    store: PropTypes.any.isRequired
};

SideBarTrigger.wrappedComponent.defaultProps = {};