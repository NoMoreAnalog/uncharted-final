import React, {PropTypes} from "react";
import {observer} from 'mobx-react';

// ViewActiveTrigger component - Clickable area to slide open/close active indicators sections
const ViewActiveTrigger = observer(['store'], (props) =>

    <button
        className="ui fluid button view-active-trigger"
        onClick={props.store.toggleActiveIndicators}
    >

        {props.store.activeIndicatorsOpen ? <i className="icon chevron down"/> : <i className="icon chevron up"/>}
        {props.store.activeIndicatorsOpen ? 'View Countries and Indicators' : 'View Active Indicators'}

    </button>
)

export default ViewActiveTrigger;

ViewActiveTrigger.wrappedComponent.propTypes = {
    store: PropTypes.any.isRequired
};

ViewActiveTrigger.wrappedComponent.defaultProps = {};