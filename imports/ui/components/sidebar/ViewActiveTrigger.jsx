import React, {PropTypes} from "react";
import {observer} from 'mobx-react';

// ViewActiveTrigger component - Clickable area to slide open/close active indicators sections
const ViewActiveTrigger = observer((props) =>

    <div className="view-active-trigger">

        <button onClick={props.store.toggleActiveIndicators}>
            {props.store.activeIndicatorsOpen ?
                <div><i className="material-icons">expand_more</i>View Countries and Indicators</div> :
                <div><i className="material-icons">expand_less</i>View Active Indicators</div>}
        </button>

    </div>
)

export default ViewActiveTrigger;

ViewActiveTrigger.propTypes = {
    store: PropTypes.any.isRequired
};

ViewActiveTrigger.defaultProps = {};