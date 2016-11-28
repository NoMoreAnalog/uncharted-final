import React, {Component} from 'react';
import {observer} from 'mobx-react';

// SideBarTrigger component - should the side bar be expanded or not
@observer(['store'])
export default class SideBarTrigger extends Component {

    render() {

        const {store} = {...this.props};

        const icon = store.sideBarExpanded ?
            <i className="material-icons">chevron_right</i> :
            <i className="material-icons">search</i>;

        return (
            <button
                ref={ref => this.trigger = ref}
                className="side-bar-trigger"
                onClick={store.toggleSideBarExpanded}>
                {icon}
            </button>
        )

    }

}