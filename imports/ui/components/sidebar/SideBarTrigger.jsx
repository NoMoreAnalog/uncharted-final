import React, {Component} from 'react';
import {observer} from 'mobx-react';

// SideBarTrigger component - should the side bar be expanded or not
@observer(['chartStore'])
export default class SideBarTrigger extends Component {

    render() {

        const {chartStore} = {...this.props};

        const icon = chartStore.sideBarExpanded ?
            <i className="material-icons">chevron_right</i> :
            <i className="material-icons">search</i>;

        return (
            <button
                ref={ref => this.trigger = ref}
                className="side-bar-trigger"
                onClick={chartStore.toggleSideBarExpanded}>
                {icon}
            </button>
        )

    }

}